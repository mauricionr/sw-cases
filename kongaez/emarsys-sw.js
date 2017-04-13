var dbName = 'emarsys_sw';
var dbConn = null;

function sendPayloadToClient(client, msg) {
  return new Promise(function(resolve, reject) {
    var msgChannel = new MessageChannel();

    msgChannel.port1.onmessage = function(e) {
      if (e.data.error) {
        reject(e.data.error);
      } else {
        resolve(e.data);
      }
    };

    client.postMessage(msg, [msgChannel.port2]);
  });
}

var dbHelper = {
  /**
   * Gets the indexeddb connection
   * @returns {Promise}
   */
  getDb: function() {

    return new Promise(function(resolve, reject) {

      var request = indexedDB.open(dbName);

      request.onupgradeneeded = function(e) {
        console.log('SW push db upgrade');
        var db = e.target.result;

        if (!db.objectStoreNames.contains('push')) {
          var obs = db.createObjectStore('push', { keyPath: 'key' });
        }
      };

      request.onerror = function(e) {
        console.error('SW could not create db', e.target.error);
        reject(e.target.error);
      };

      request.onsuccess = function(e) {
        dbConn = e.target.result;

        console.log('SW push db created');
        resolve(dbConn);
      }
    });
  },

  /**
   * Resolves with the data stored in the indexedDb by the service worker
   * @returns {Promise.<Object>}
   */
  getFromDb: function() {
    return this.getDb().then(function(dbConn) {
      return new Promise(function(resolve, reject) {
        var tx = dbConn.transaction(['push'], 'readonly');
        var store = tx.objectStore('push');

        var result = null;

        var req = store.get('data');

        req.onsuccess = function(e) {
          var record = e.target.result;

          dbConn.close();

          if (record) {
            result = record.data;
          }
          resolve(result);
        };

        req.onerror = function(e) {
          dbConn.close();
          reject(e.target.error);
        };
      });
    });
  },

  /**
   * Saves the specified data in indexeddb
   * @param data
   * @returns {Promise.<Object>}
   */
  saveToDb: function(data) {
    return this.getDb().then(function(dbConn) {
      return new Promise(function(resolve, reject) {
        var record = {
          data: data,
          key: 'data'
        };

        var tx = dbConn.transaction(['push'], 'readwrite');
        var store = tx.objectStore('push');

        var req = store.put(record);

        req.onsuccess = function(e) {

          dbConn.close();
          resolve(e.target.result);
        };

        req.onerror = function(e) {
          dbConn.close();
          reject(e.target.error);
        };
      });
    });
  },

  /**
   * Removes the data stored in the indexeddb
   * @returns {Promise.<Boolean>}
   */
  removeFromDb: function() {
    return this.getDb().then(function(dbConn) {
      return new Promise(function(resolve, reject) {
        var tx = dbConn.transaction(['push'], 'readwrite');
        var store = tx.objectStore('push');

        var req = store.delete('data');

        req.onsuccess = function(e) {

          dbConn.close();
          resolve(null);
        };

        req.onerror = function(e) {
          dbConn.close();
          reject(e.target.error);
        };
      });
    });
  }
};

self.addEventListener('push', function(e) {
  var pushData = e.data.json();

  e.waitUntil(
    // Add the pushData to idb
    dbHelper.saveToDb(pushData)
  );
});

self.addEventListener('notificationclick', function(e) {

  var pushData = null;

  e.waitUntil(

    // Get the push data from idb
    dbHelper.getFromDb().then(function(data) {
      pushData = data;
      return data;
    }).then(function() {
      clients.matchAll({ type: 'window' }).then(function(allClients) {
        if (allClients.length) {
          // Return the last available client
          var client = allClients[allClients.length - 1];

          // Set the focus on this client
          // if('focus' in client){
          //     return client.focus();
          // }
          return client;
        } else {
          // If no client is open, open a client and return it
          return clients.openWindow('/');
        }
      }).then(function(client) {

        pushData.messageOpen = true;

        dbHelper.saveToDb(pushData).then(function() {
          if (client) {
            // Android doesn't close the notification when you click on it
            // See: http://crbug.com/463146
            e.notification.close();

            return sendPayloadToClient(client, {
              command: 'message_open',
              data: pushData
            });
          } else {
            return false;
          }
        });
      })
    })
  );
});