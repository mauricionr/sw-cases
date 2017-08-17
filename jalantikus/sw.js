'use strict';

importScripts('public/js/cache-polyfill.js');
importScripts('public/js/toolbox/sw-toolbox.js');
var version = '0.1.6';
var versionnumber = '016';
var change = '1';
var _url = '';
var _subscription = "";
var cacheName = 'jtcache';
var listprecache = [
    '/',
    '/favicon.ico',
    '/index.php',
    '/manifest' + versionnumber + '.json',
    '/public/css/all' + versionnumber + '.css',
    '/public/js/all' + versionnumber + '.js',
    '/public/images/loading.gif'
];
self.addEventListener('install', function (event) {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    // console.log('service worker di perbarui');
    event.waitUntil(self.clients.claim());
});

/*cahe list file*/
//toolbox.options.debug = true;
toolbox.precache(listprecache);

toolbox.router.get('/api/(.*)', toolbox.fastest, {
    cache: {
        name: 'apicache',
        maxAgeSeconds: 60 * 60 * 6
    }
});
toolbox.router.get('/notif.php(.*)', toolbox.networkFirst);
toolbox.router.get('/tips/(.*)', toolbox.cacheFirst);
toolbox.router.get('/all/(.*)', toolbox.cacheFirst);
toolbox.router.get('/news/(.*)', toolbox.cacheFirst);
toolbox.router.get('/apps/(.*)', toolbox.cacheFirst);
toolbox.router.get('/games/(.*)', toolbox.cacheFirst);
toolbox.router.get('/gadgets/(.*)', toolbox.cacheFirst);
toolbox.router.get('/gokil/(.*)', toolbox.cacheFirst);
toolbox.router.get('/public/(.*)', toolbox.cacheFirst, {
    cache: {
        name: 'publicassets',
        maxAgeSeconds: 60 * 60 * 24 * 3
    }
});
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
    origin: 'https://fonts.googleapis.com',
    cache: {
        name: 'font'
    }
});
toolbox.router.get('/(.*)', toolbox.cacheFirst, {
    origin: 'https://assets.jalantikus.com',
    cache: {
        name: 'imageassets',
        maxAgeSeconds: 60 * 60 * 24 * 3
    }
});
toolbox.router.get('/', toolbox.networkFirst);
toolbox.router.get('(.*)', toolbox.fastest);
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
var d = new Date();
var n = d.getTime();
self.addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    event.waitUntil(
        registration.pushManager.getSubscription().then(function (subscription) {
            if (subscription) {
                _subscription = endpointWorkaround(subscription);

                if (_subscription.indexOf("https://android.googleapis.com/gcm/send/") !== 0) {
                    return;
                }

                _subscription = _subscription.split("/");
                _subscription = _subscription[_subscription.length - 1];

                return fetch('https://app.jalantikus.com/notif.php?r=getNotification/' + _subscription + '/pushed').then(function (response) {
                    // console.log('https://jalantikus.com/api/?r=getNotification/' + _subscription + '/pushed');

                    if (response.status !== 200) {
                        throw new Error();
                    }

                    return response.json().then(function (data) {
                        if (data.error || !data.notification) {
                            throw new Error();
                        }

                        if (Array.isArray(data.notification) && data.notification.length > 0) {
                            for (var i = 0; i < data.notification.length; i++) {
                                var title = data.notification[i].title;
                                var message = data.notification[i].message;
                                var icon = data.notification[i].icon;
                                var notificationTag = data.notification[i].tag;
                                var detail = data.notification[i].data;

                                return self.registration.showNotification(title, {
                                    body: message,
                                    icon: icon,
                                    tag: notificationTag,
                                    data: detail
                                });
                            };
                        }
                        else if (data.notification.message != null && data.notification.title != null) {
                            var title = data.notification.title;
                            var message = data.notification.message;
                            var icon = data.notification.icon;
                            var notificationTag = data.notification.tag;
                            var detail = data.notification.data;

                            return self.registration.showNotification(title, {
                                body: message,
                                icon: icon,
                                tag: notificationTag,
                                data: detail
                            });
                        }
                    });
                }).catch(function (err) {

                })
            }
            else {
                return;
            }
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.waitUntil(
        clients.matchAll({
            type: "window"
        }).then(function (clientList) {
            event.notification.close();

            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == event.notification.data.urldetail && 'focus' in client)
                    return client.focus();
            }

            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.urldetail);
            }
        })
    );

    var _url = 'https://app.jalantikus.com/notif.php?r=getNotification/' + _subscription + '/opened/' + event.notification.tag;

    event.waitUntil(
        fetch(_url).then(function (response) {
            // console.log(_url);
        }).catch(function (err) {

        })
    );
});

function getSubscription() {
    registration.pushManager.getSubscription().then(function (subscription) {
        if (subscription) {
            _subscription = endpointWorkaround(subscription);

            if (_subscription.indexOf("https://android.googleapis.com/gcm/send/") !== 0) {
                return;
            }

            _subscription = _subscription.split("/");
            _subscription = _subscription[_subscription.length - 1];
        }
    });
}

function endpointWorkaround(pushSubscription) {
    if (pushSubscription.endpoint.indexOf("https://android.googleapis.com/gcm/send") !== 0) {
        return pushSubscription.endpoint;
    }

    var mergedEndpoint = pushSubscription.endpoint;

    if (pushSubscription.subscriptionId && pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
        mergedEndpoint = pushSubscription.endpoint + "/" +
            pushSubscription.subscriptionId;
    }
    return mergedEndpoint;
}

function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}
self.addEventListener('message', function (event) {
    var request;
});
