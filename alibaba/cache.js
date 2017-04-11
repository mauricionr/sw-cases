// <!-- tangram:133 begin-->

/*
 test
  Copyright 2014 Google Inc. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
(function() {
  var e = Cache.prototype.addAll;
  var t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
  if (t) { var r = t[1]; var n = parseInt(t[2]) }
  if (e && (!t || r === "Firefox" && n >= 46 || r === "Chrome" && n >= 50)) { return }
  Cache.prototype.addAll = function o(e) {
    var t = this;

    function r(e) {
      this.name = "NetworkError";
      this.code = 19;
      this.message = e
    }
    r.prototype = Object.create(Error.prototype);
    return Promise.resolve().then(function() {
      if (arguments.length < 1) throw new TypeError;
      var t = [];
      e = e.map(function(e) { if (e instanceof Request) { return e } else { return String(e) } });
      return Promise.all(e.map(function(e) { if (typeof e === "string") { e = new Request(e) } var t = new URL(e.url).protocol; if (t !== "http:" && t !== "https:") { throw new r("Invalid scheme") } return fetch(e.clone()) }))
    }).then(function(n) { if (n.some(function(e) { return !e.ok })) { throw new r("Incorrect response status") } return Promise.all(n.map(function(r, n) { return t.put(e[n], r) })) }).then(function() { return undefined })
  };
  Cache.prototype.add = function i(e) { return this.addAll([e]) }
})();
(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else {
    var g;
    if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this }
    g.toolbox = f()
  }
})(function() {
  var define, module, exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f }
        var l = n[o] = { exports: {} };
        t[o][0].call(l.exports, function(e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r)
      }
      return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
  })({
    1: [function(require, module, exports) {
      /*
        Copyright 2014 Google Inc. All Rights Reserved.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
      */
      'use strict';

      var globalOptions = require('./options');
      var idbCacheExpiration = require('./idb-cache-expiration');

      function debug(message, options) {
        options = options || {};
        var flag = options.debug || globalOptions.debug;
        if (flag) {
          console.log('[sw-toolbox] ' + message);
        }
      }

      function openCache(options) {
        var cacheName;
        if (options && options.cache) {
          cacheName = options.cache.name;
        }
        cacheName = cacheName || globalOptions.cache.name;

        return caches.open(cacheName);
      }

      function fetchAndCache(request, options) {
        options = options || {};
        var successResponses = options.successResponses ||
          globalOptions.successResponses;

        return fetch(request.clone()).then(function(response) {
          // Only cache GET requests with successful responses.
          // Since this is not part of the promise chain, it will be done
          // asynchronously and will not block the response from being returned to the
          // page.
          if (response.type !== 'opaqueredirect' && request.method === 'GET' && successResponses.test(response.status)) {
            openCache(options).then(function(cache) {
              if (options && typeof options.rewrite === 'string') {
                request = new Request(options.rewrite, { credentials: request.credentials, headers: request.headers, method: request.method });
              }
              cache.put(request, response).then(function() {
                // If any of the options are provided in options.cache then use them.
                // Do not fallback to the global options for any that are missing
                // unless they are all missing.
                var cacheOptions = options.cache || globalOptions.cache;

                // Only run the cache expiration logic if at least one of the maximums
                // is set, and if we have a name for the cache that the options are
                // being applied to.
                if ((cacheOptions.maxEntries || cacheOptions.maxAgeSeconds) &&
                  cacheOptions.name) {
                  queueCacheExpiration(request, cache, cacheOptions);
                }
              });
            });
          }

          return response.clone();
        });
      }

      var cleanupQueue;

      function queueCacheExpiration(request, cache, cacheOptions) {
        var cleanup = cleanupCache.bind(null, request, cache, cacheOptions);

        if (cleanupQueue) {
          cleanupQueue = cleanupQueue.then(cleanup);
        } else {
          cleanupQueue = cleanup();
        }
      }

      function cleanupCache(request, cache, cacheOptions) {
        var requestUrl = request.url;
        var maxAgeSeconds = cacheOptions.maxAgeSeconds;
        var maxEntries = cacheOptions.maxEntries;
        var cacheName = cacheOptions.name;

        var now = Date.now();
        debug('Updating LRU order for ' + requestUrl + '. Max entries is ' +
          maxEntries + ', max age is ' + maxAgeSeconds);

        return idbCacheExpiration.getDb(cacheName).then(function(db) {
          return idbCacheExpiration.setTimestampForUrl(db, requestUrl, now);
        }).then(function(db) {
          return idbCacheExpiration.expireEntries(db, maxEntries, maxAgeSeconds, now);
        }).then(function(urlsToDelete) {
          debug('Successfully updated IDB.');

          var deletionPromises = urlsToDelete.map(function(urlToDelete) {
            return cache.delete(urlToDelete);
          });

          return Promise.all(deletionPromises).then(function() {
            debug('Done with cache cleanup.');
          });
        }).catch(function(error) {
          debug(error);
        });
      }

      function renameCache(source, destination, options) {
        debug('Renaming cache: [' + source + '] to [' + destination + ']', options);
        return caches.delete(destination).then(function() {
          return Promise.all([
            caches.open(source),
            caches.open(destination)
          ]).then(function(results) {
            var sourceCache = results[0];
            var destCache = results[1];

            return sourceCache.keys().then(function(requests) {
              return Promise.all(requests.map(function(request) {
                return sourceCache.match(request).then(function(response) {
                  return destCache.put(request, response);
                });
              }));
            }).then(function() {
              return caches.delete(source);
            });
          });
        });
      }

      module.exports = {
        debug: debug,
        fetchAndCache: fetchAndCache,
        openCache: openCache,
        renameCache: renameCache
      };

    }, { "./idb-cache-expiration": 2, "./options": 3 }],
    2: [function(require, module, exports) {
      /*
       Copyright 2015 Google Inc. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
      */
      'use strict';

      var DB_PREFIX = 'sw-toolbox-';
      var DB_VERSION = 1;
      var STORE_NAME = 'store';
      var URL_PROPERTY = 'url';
      var TIMESTAMP_PROPERTY = 'timestamp';
      var cacheNameToDbPromise = {};

      function openDb(cacheName) {
        return new Promise(function(resolve, reject) {
          var request = indexedDB.open(DB_PREFIX + cacheName, DB_VERSION);

          request.onupgradeneeded = function() {
            var objectStore = request.result.createObjectStore(STORE_NAME, { keyPath: URL_PROPERTY });
            objectStore.createIndex(TIMESTAMP_PROPERTY, TIMESTAMP_PROPERTY, { unique: false });
          };

          request.onsuccess = function() {
            resolve(request.result);
          };

          request.onerror = function() {
            reject(request.error);
          };
        });
      }

      function getDb(cacheName) {
        if (!(cacheName in cacheNameToDbPromise)) {
          cacheNameToDbPromise[cacheName] = openDb(cacheName);
        }

        return cacheNameToDbPromise[cacheName];
      }

      function setTimestampForUrl(db, url, now) {
        return new Promise(function(resolve, reject) {
          var transaction = db.transaction(STORE_NAME, 'readwrite');
          var objectStore = transaction.objectStore(STORE_NAME);
          objectStore.put({ url: url, timestamp: now });

          transaction.oncomplete = function() {
            resolve(db);
          };

          transaction.onabort = function() {
            reject(transaction.error);
          };
        });
      }

      function expireOldEntries(db, maxAgeSeconds, now) {
        // Bail out early by resolving with an empty array if we're not using
        // maxAgeSeconds.
        if (!maxAgeSeconds) {
          return Promise.resolve([]);
        }

        return new Promise(function(resolve, reject) {
          var maxAgeMillis = maxAgeSeconds * 1000;
          var urls = [];

          var transaction = db.transaction(STORE_NAME, 'readwrite');
          var objectStore = transaction.objectStore(STORE_NAME);
          var index = objectStore.index(TIMESTAMP_PROPERTY);

          index.openCursor().onsuccess = function(cursorEvent) {
            var cursor = cursorEvent.target.result;
            if (cursor) {
              if (now - maxAgeMillis > cursor.value[TIMESTAMP_PROPERTY]) {
                var url = cursor.value[URL_PROPERTY];
                urls.push(url);
                objectStore.delete(url);
                cursor.continue();
              }
            }
          };

          transaction.oncomplete = function() {
            resolve(urls);
          };

          transaction.onabort = reject;
        });
      }

      function expireExtraEntries(db, maxEntries) {
        // Bail out early by resolving with an empty array if we're not using
        // maxEntries.
        if (!maxEntries) {
          return Promise.resolve([]);
        }

        return new Promise(function(resolve, reject) {
          var urls = [];

          var transaction = db.transaction(STORE_NAME, 'readwrite');
          var objectStore = transaction.objectStore(STORE_NAME);
          var index = objectStore.index(TIMESTAMP_PROPERTY);

          var countRequest = index.count();
          index.count().onsuccess = function() {
            var initialCount = countRequest.result;

            if (initialCount > maxEntries) {
              index.openCursor().onsuccess = function(cursorEvent) {
                var cursor = cursorEvent.target.result;
                if (cursor) {
                  var url = cursor.value[URL_PROPERTY];
                  urls.push(url);
                  objectStore.delete(url);
                  if (initialCount - urls.length > maxEntries) {
                    cursor.continue();
                  }
                }
              };
            }
          };

          transaction.oncomplete = function() {
            resolve(urls);
          };

          transaction.onabort = reject;
        });
      }

      function expireEntries(db, maxEntries, maxAgeSeconds, now) {
        return expireOldEntries(db, maxAgeSeconds, now).then(function(oldUrls) {
          return expireExtraEntries(db, maxEntries).then(function(extraUrls) {
            return oldUrls.concat(extraUrls);
          });
        });
      }

      module.exports = {
        getDb: getDb,
        setTimestampForUrl: setTimestampForUrl,
        expireEntries: expireEntries
      };

    }, {}],
    3: [function(require, module, exports) {
      /*
          Copyright 2015 Google Inc. All Rights Reserved.

          Licensed under the Apache License, Version 2.0 (the "License");
          you may not use this file except in compliance with the License.
          You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

          Unless required by applicable law or agreed to in writing, software
          distributed under the License is distributed on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          See the License for the specific language governing permissions and
          limitations under the License.
      */
      'use strict';

      // TODO: This is necessary to handle different implementations in the wild
      // The spec defines self.registration, but it was not implemented in Chrome 40.
      var scope;
      if (self.registration) {
        scope = self.registration.scope;
      } else {
        scope = self.scope || new URL('./', self.location).href;
      }

      module.exports = {
        cache: {
          name: '$$$toolbox-cache$$$' + scope + '$$$',
          maxAgeSeconds: null,
          maxEntries: null
        },
        debug: false,
        networkTimeoutSeconds: null,
        preCacheItems: [],
        // A regular expression to apply to HTTP response codes. Codes that match
        // will be considered successes, while others will not, and will not be
        // cached.
        successResponses: /^0|([123]\d\d)|(40[14567])|410$/
      };

    }, {}],
    4: [function(require, module, exports) {
      /*
        Copyright 2014 Google Inc. All Rights Reserved.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
      */
      'use strict';

      // TODO: Use self.registration.scope instead of self.location
      var url = new URL('./', self.location);
      var basePath = url.pathname;
      var pathRegexp = require('path-to-regexp');

      var Route = function(method, path, handler, options) {
        if (path instanceof RegExp) {
          this.fullUrlRegExp = path;
        } else {
          // The URL() constructor can't parse express-style routes as they are not
          // valid urls. This means we have to manually manipulate relative urls into
          // absolute ones. This check is extremely naive but implementing a tweaked
          // version of the full algorithm seems like overkill
          // (https://url.spec.whatwg.org/#concept-basic-url-parser)
          if (path.indexOf('/') !== 0) {
            path = basePath + path;
          }

          this.keys = [];
          this.regexp = pathRegexp(path, this.keys);
        }

        this.method = method;
        this.options = options;
        this.handler = handler;
      };

      Route.prototype.makeHandler = function(url) {
        var values;
        if (this.regexp) {
          var match = this.regexp.exec(url);
          values = {};
          this.keys.forEach(function(key, index) {
            values[key.name] = match[index + 1];
          });
        }

        return function(request) {
          return this.handler(request, values, this.options);
        }.bind(this);
      };

      module.exports = Route;

    }, { "path-to-regexp": 14 }],
    5: [function(require, module, exports) {
      /*
        Copyright 2014 Google Inc. All Rights Reserved.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
      */
      'use strict';

      var Route = require('./route');

      function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }

      var keyMatch = function(map, string) {
        // This would be better written as a for..of loop, but that would break the
        // minifyify process in the build.
        var entriesIterator = map.entries();
        var item = entriesIterator.next();
        var matches = [];
        while (!item.done) {
          var pattern = new RegExp(item.value[0]);
          if (pattern.test(string)) {
            matches.push(item.value[1]);
          }
          item = entriesIterator.next();
        }
        return matches;
      };

      var Router = function() {
        this.routes = new Map();
        // Create the dummy origin for RegExp-based routes
        this.routes.set(RegExp, new Map());
        this.default = null;
      };

      ['get', 'post', 'put', 'delete', 'head', 'any'].forEach(function(method) {
        Router.prototype[method] = function(path, handler, options) {
          return this.add(method, path, handler, options);
        };
      });

      Router.prototype.add = function(method, path, handler, options) {
        options = options || {};
        var origin;

        if (path instanceof RegExp) {
          // We need a unique key to use in the Map to distinguish RegExp paths
          // from Express-style paths + origins. Since we can use any object as the
          // key in a Map, let's use the RegExp constructor!
          origin = RegExp;
        } else {
          origin = options.origin || self.location.origin;
          if (origin instanceof RegExp) {
            origin = origin.source;
          } else {
            origin = regexEscape(origin);
          }
        }

        method = method.toLowerCase();

        var route = new Route(method, path, handler, options);

        if (!this.routes.has(origin)) {
          this.routes.set(origin, new Map());
        }

        var methodMap = this.routes.get(origin);
        if (!methodMap.has(method)) {
          methodMap.set(method, new Map());
        }

        var routeMap = methodMap.get(method);
        var regExp = route.regexp || route.fullUrlRegExp;
        routeMap.set(regExp.source, route);
      };

      Router.prototype.matchMethod = function(method, url) {
        var urlObject = new URL(url);
        var origin = urlObject.origin;
        var path = urlObject.pathname;

        // We want to first check to see if there's a match against any
        // "Express-style" routes (string for the path, RegExp for the origin).
        // Checking for Express-style matches first maintains the legacy behavior.
        // If there's no match, we next check for a match against any RegExp routes,
        // where the RegExp in question matches the full URL (both origin and path).
        return this._match(method, keyMatch(this.routes, origin), path) ||
          this._match(method, [this.routes.get(RegExp)], url);
      };

      Router.prototype._match = function(method, methodMaps, pathOrUrl) {
        if (methodMaps.length === 0) {
          return null;
        }

        for (var i = 0; i < methodMaps.length; i++) {
          var methodMap = methodMaps[i];
          var routeMap = methodMap && methodMap.get(method.toLowerCase());
          if (routeMap) {
            var routes = keyMatch(routeMap, pathOrUrl);
            if (routes.length > 0) {
              return routes[0].makeHandler(pathOrUrl);
            }
          }
        }

        return null;
      };

      Router.prototype.match = function(request) {
        return this.matchMethod(request.method, request.url) ||
          this.matchMethod('any', request.url);
      };

      module.exports = new Router();

    }, { "./route": 4 }],
    6: [function(require, module, exports) {
      /*
          Copyright 2014 Google Inc. All Rights Reserved.

          Licensed under the Apache License, Version 2.0 (the "License");
          you may not use this file except in compliance with the License.
          You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

          Unless required by applicable law or agreed to in writing, software
          distributed under the License is distributed on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          See the License for the specific language governing permissions and
          limitations under the License.
      */
      'use strict';
      var helpers = require('../helpers');

      function cacheFirst(request, values, options) {
        helpers.debug('Strategy: cache first [' + request.url + ']', options);
        return helpers.openCache(options).then(function(cache) {
          return cache.match(request).then(function(response) {
            if (response && response.status < 400) {
              return response;
            }

            return helpers.fetchAndCache(request, options);
          });
        });
      }

      module.exports = cacheFirst;

    }, { "../helpers": 1 }],
    7: [function(require, module, exports) {
      /*
          Copyright 2014 Google Inc. All Rights Reserved.

          Licensed under the Apache License, Version 2.0 (the "License");
          you may not use this file except in compliance with the License.
          You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

          Unless required by applicable law or agreed to in writing, software
          distributed under the License is distributed on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          See the License for the specific language governing permissions and
          limitations under the License.
      */
      'use strict';
      var helpers = require('../helpers');

      function cacheOnly(request, values, options) {
        helpers.debug('Strategy: cache only [' + request.url + ']', options);
        if (options && typeof options.rewrite === 'string') {
          request = new Request(options.rewrite, { credentials: request.credentials, headers: request.headers, method: request.method });
        }
        return helpers.openCache(options).then(function(cache) {
          return cache.match(request);
        });
      }

      module.exports = cacheOnly;

    }, { "../helpers": 1 }],
    8: [function(require, module, exports) {
      /*
        Copyright 2014 Google Inc. All Rights Reserved.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
      */
      'use strict';
      var helpers = require('../helpers');
      var cacheOnly = require('./cacheOnly');

      function fastest(request, values, options) {
        helpers.debug('Strategy: fastest [' + request.url + ']', options);

        return new Promise(function(resolve, reject) {
          var rejected = false;
          var reasons = [];

          var maybeReject = function(reason) {
            reasons.push(reason.toString());
            if (rejected) {
              reject(new Error('Both cache and network failed: "' +
                reasons.join('", "') + '"'));
            } else {
              rejected = true;
            }
          };

          var maybeResolve = function(result) {
            if (result instanceof Response) {
              resolve(result);
            } else {
              maybeReject('No result returned');
            }
          };

          helpers.fetchAndCache(request.clone(), options)
            .then(maybeResolve, maybeReject);

          cacheOnly(request, values, options)
            .then(maybeResolve, maybeReject);
        });
      }

      module.exports = fastest;

    }, { "../helpers": 1, "./cacheOnly": 7 }],
    9: [function(require, module, exports) {
      /*
          Copyright 2014 Google Inc. All Rights Reserved.

          Licensed under the Apache License, Version 2.0 (the "License");
          you may not use this file except in compliance with the License.
          You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

          Unless required by applicable law or agreed to in writing, software
          distributed under the License is distributed on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          See the License for the specific language governing permissions and
          limitations under the License.
      */
      module.exports = {
        networkOnly: require('./networkOnly'),
        networkFirst: require('./networkFirst'),
        cacheOnly: require('./cacheOnly'),
        cacheFirst: require('./cacheFirst'),
        fastest: require('./fastest')
      };

    }, { "./cacheFirst": 6, "./cacheOnly": 7, "./fastest": 8, "./networkFirst": 10, "./networkOnly": 11 }],
    10: [function(require, module, exports) {
      /*
       Copyright 2015 Google Inc. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at

           http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
      */
      'use strict';
      var globalOptions = require('../options');
      var helpers = require('../helpers');

      function networkFirst(request, values, options) {
        options = options || {};
        var successResponses = options.successResponses ||
          globalOptions.successResponses;
        // This will bypass options.networkTimeout if it's set to a false-y value like
        // 0, but that's the sane thing to do anyway.
        var networkTimeoutSeconds = options.networkTimeoutSeconds ||
          globalOptions.networkTimeoutSeconds;
        helpers.debug('Strategy: network first [' + request.url + ']', options);

        return helpers.openCache(options).then(function(cache) {
          var timeoutId;
          var promises = [];
          var originalResponse;

          if (networkTimeoutSeconds) {
            var cacheWhenTimedOutPromise = new Promise(function(resolve) {
              timeoutId = setTimeout(function() {
                cache.match(request).then(function(response) {
                  if (response) {
                    // Only resolve this promise if there's a valid response in the
                    // cache. This ensures that we won't time out a network request
                    // unless there's a cached entry to fallback on, which is arguably
                    // the preferable behavior.
                    resolve(response);
                  }
                });
              }, networkTimeoutSeconds * 1000);
            });
            promises.push(cacheWhenTimedOutPromise);
          }

          var networkPromise = helpers.fetchAndCache(request, options)
            .then(function(response) {
              // We've got a response, so clear the network timeout if there is one.
              if (timeoutId) {
                clearTimeout(timeoutId);
              }

              if (successResponses.test(response.status)) {
                return response;
              }

              helpers.debug('Response was an HTTP error: ' + response.statusText,
                options);
              originalResponse = response;
              throw new Error('Bad response');
            }).catch(function(error) {
              helpers.debug('Network or response error, fallback to cache [' +
                request.url + ']', options);
              if (options && typeof options.rewrite === 'string') {
                request = new Request(options.rewrite, { credentials: request.credentials, headers: request.headers, method: request.method });
              }
              return cache.match(request).then(function(response) {
                // If there's a match in the cache, resolve with that.
                if (response) {
                  return response;
                }

                // If we have a Response object from the previous fetch, then resolve
                // with that, even though it corresponds to an error status code.
                if (originalResponse) {
                  return originalResponse;
                }

                // If we don't have a Response object from the previous fetch, likely
                // due to a network failure, then reject with the failure error.
                throw error;
              });
            });

          promises.push(networkPromise);

          return Promise.race(promises);
        });
      }

      module.exports = networkFirst;

    }, { "../helpers": 1, "../options": 3 }],
    11: [function(require, module, exports) {
      /*
          Copyright 2014 Google Inc. All Rights Reserved.

          Licensed under the Apache License, Version 2.0 (the "License");
          you may not use this file except in compliance with the License.
          You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

          Unless required by applicable law or agreed to in writing, software
          distributed under the License is distributed on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          See the License for the specific language governing permissions and
          limitations under the License.
      */
      'use strict';
      var helpers = require('../helpers');

      function networkOnly(request, values, options) {
        helpers.debug('Strategy: network only [' + request.url + ']', options);
        return fetch(request);
      }

      module.exports = networkOnly;

    }, { "../helpers": 1 }],
    12: [function(require, module, exports) {
      /*
        Copyright 2014 Google Inc. All Rights Reserved.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.
      */
      'use strict';

      require('serviceworker-cache-polyfill');
      var options = require('./options');
      var router = require('./router');
      var helpers = require('./helpers');
      var strategies = require('./strategies');

      helpers.debug('Service Worker Toolbox is loading');

      // Install
      var flatten = function(items) {
        return items.reduce(function(a, b) {
          return a.concat(b);
        }, []);
      };

      var validatePrecacheInput = function(items) {
        var isValid = Array.isArray(items);
        if (isValid) {
          items.forEach(function(item) {
            if (!(typeof item === 'string' || (item instanceof Request))) {
              isValid = false;
            }
          });
        }

        if (!isValid) {
          throw new TypeError('The precache method expects either an array of ' +
            'strings and/or Requests or a Promise that resolves to an array of ' +
            'strings and/or Requests.');
        }

        return items;
      };

      self.addEventListener('install', function(event) {
        var inactiveCache = options.cache.name + '$$$inactive$$$';
        helpers.debug('install event fired');
        helpers.debug('creating cache [' + inactiveCache + ']');
        event.waitUntil(
          helpers.openCache({ cache: { name: inactiveCache } })
          .then(function(cache) {
            return Promise.all(options.preCacheItems)
              .then(flatten)
              .then(validatePrecacheInput)
              .then(function(preCacheItems) {
                helpers.debug('preCache list: ' +
                  (preCacheItems.join(', ') || '(none)'));
                return cache.addAll(preCacheItems);
              });
          })
        );
      });

      // Activate

      self.addEventListener('activate', function(event) {
        helpers.debug('activate event fired');
        var inactiveCache = options.cache.name + '$$$inactive$$$';
        event.waitUntil(helpers.renameCache(inactiveCache, options.cache.name));
      });

      // Fetch

      self.addEventListener('fetch', function(event) {
        var handler = router.match(event.request);

        if (handler) {
          event.respondWith(handler(event.request));
        } else if (router.default && event.request.method === 'GET') {
          event.respondWith(router.default(event.request));
        }
      });

      // Caching

      function cache(url, options) {
        return helpers.openCache(options).then(function(cache) {
          return cache.add(url);
        });
      }

      function uncache(url, options) {
        return helpers.openCache(options).then(function(cache) {
          return cache.delete(url);
        });
      }

      function precache(items) {
        if (!(items instanceof Promise)) {
          validatePrecacheInput(items);
        }

        options.preCacheItems = options.preCacheItems.concat(items);
      }

      module.exports = {
        networkOnly: strategies.networkOnly,
        networkFirst: strategies.networkFirst,
        cacheOnly: strategies.cacheOnly,
        cacheFirst: strategies.cacheFirst,
        fastest: strategies.fastest,
        router: router,
        options: options,
        cache: cache,
        uncache: uncache,
        precache: precache
      };

    }, { "./helpers": 1, "./options": 3, "./router": 5, "./strategies": 9, "serviceworker-cache-polyfill": 15 }],
    13: [function(require, module, exports) {
      module.exports = Array.isArray || function(arr) {
        return Object.prototype.toString.call(arr) == '[object Array]';
      };

    }, {}],
    14: [function(require, module, exports) {
      var isarray = require('isarray')

      /**
       * Expose `pathToRegexp`.
       */
      module.exports = pathToRegexp
      module.exports.parse = parse
      module.exports.compile = compile
      module.exports.tokensToFunction = tokensToFunction
      module.exports.tokensToRegExp = tokensToRegExp

      /**
       * The main path matching regexp utility.
       *
       * @type {RegExp}
       */
      var PATH_REGEXP = new RegExp([
        // Match escaped characters that would otherwise appear in future matches.
        // This allows the user to escape special characters that won't transform.
        '(\\\\.)',
        // Match Express-style parameters and un-named parameters with a prefix
        // and optional suffixes. Matches appear as:
        //
        // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
        // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
        // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
        '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
      ].join('|'), 'g')

      /**
       * Parse a string for the raw tokens.
       *
       * @param  {string} str
       * @return {!Array}
       */
      function parse(str) {
        var tokens = []
        var key = 0
        var index = 0
        var path = ''
        var res

        while ((res = PATH_REGEXP.exec(str)) != null) {
          var m = res[0]
          var escaped = res[1]
          var offset = res.index
          path += str.slice(index, offset)
          index = offset + m.length

          // Ignore already escaped sequences.
          if (escaped) {
            path += escaped[1]
            continue
          }

          var next = str[index]
          var prefix = res[2]
          var name = res[3]
          var capture = res[4]
          var group = res[5]
          var modifier = res[6]
          var asterisk = res[7]

          // Push the current path onto the tokens.
          if (path) {
            tokens.push(path)
            path = ''
          }

          var partial = prefix != null && next != null && next !== prefix
          var repeat = modifier === '+' || modifier === '*'
          var optional = modifier === '?' || modifier === '*'
          var delimiter = res[2] || '/'
          var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

          tokens.push({
            name: name || key++,
            prefix: prefix || '',
            delimiter: delimiter,
            optional: optional,
            repeat: repeat,
            partial: partial,
            asterisk: !!asterisk,
            pattern: escapeGroup(pattern)
          })
        }

        // Match any characters still remaining.
        if (index < str.length) {
          path += str.substr(index)
        }

        // If the path exists, push it onto the end.
        if (path) {
          tokens.push(path)
        }

        return tokens
      }

      /**
       * Compile a string to a template function for the path.
       *
       * @param  {string}             str
       * @return {!function(Object=, Object=)}
       */
      function compile(str) {
        return tokensToFunction(parse(str))
      }

      /**
       * Prettier encoding of URI path segments.
       *
       * @param  {string}
       * @return {string}
       */
      function encodeURIComponentPretty(str) {
        return encodeURI(str).replace(/[\/?#]/g, function(c) {
          return '%' + c.charCodeAt(0).toString(16).toUpperCase()
        })
      }

      /**
       * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
       *
       * @param  {string}
       * @return {string}
       */
      function encodeAsterisk(str) {
        return encodeURI(str).replace(/[?#]/g, function(c) {
          return '%' + c.charCodeAt(0).toString(16).toUpperCase()
        })
      }

      /**
       * Expose a method for transforming tokens into the path function.
       */
      function tokensToFunction(tokens) {
        // Compile all the tokens into regexps.
        var matches = new Array(tokens.length)

        // Compile all the patterns before compilation.
        for (var i = 0; i < tokens.length; i++) {
          if (typeof tokens[i] === 'object') {
            matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
          }
        }

        return function(obj, opts) {
          var path = ''
          var data = obj || {}
          var options = opts || {}
          var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

          for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i]

            if (typeof token === 'string') {
              path += token

              continue
            }

            var value = data[token.name]
            var segment

            if (value == null) {
              if (token.optional) {
                // Prepend partial segment prefixes.
                if (token.partial) {
                  path += token.prefix
                }

                continue
              } else {
                throw new TypeError('Expected "' + token.name + '" to be defined')
              }
            }

            if (isarray(value)) {
              if (!token.repeat) {
                throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
              }

              if (value.length === 0) {
                if (token.optional) {
                  continue
                } else {
                  throw new TypeError('Expected "' + token.name + '" to not be empty')
                }
              }

              for (var j = 0; j < value.length; j++) {
                segment = encode(value[j])

                if (!matches[i].test(segment)) {
                  throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
                }

                path += (j === 0 ? token.prefix : token.delimiter) + segment
              }

              continue
            }

            segment = token.asterisk ? encodeAsterisk(value) : encode(value)

            if (!matches[i].test(segment)) {
              throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }

            path += token.prefix + segment
          }

          return path
        }
      }

      /**
       * Escape a regular expression string.
       *
       * @param  {string} str
       * @return {string}
       */
      function escapeString(str) {
        return str.replace(/([.+*?=^!:$}{()[\]|\/])/g, '\\$1')
      }

      /**
       * Escape the capturing group by escaping special characters and meaning.
       *
       * @param  {string} group
       * @return {string}
       */
      function escapeGroup(group) {
        return group.replace(/([=!:$\/()])/g, '\\$1')
      }

      /**
       * Attach the keys as a property of the regexp.
       *
       * @param  {!RegExp} re
       * @param  {Array}   keys
       * @return {!RegExp}
       */
      function attachKeys(re, keys) {
        re.keys = keys
        return re
      }

      /**
       * Get the flags for a regexp from the options.
       *
       * @param  {Object} options
       * @return {string}
       */
      function flags(options) {
        return options.sensitive ? '' : 'i'
      }

      /**
       * Pull out keys from a regexp.
       *
       * @param  {!RegExp} path
       * @param  {!Array}  keys
       * @return {!RegExp}
       */
      function regexpToRegexp(path, keys) {
        // Use a negative lookahead to match only capturing groups.
        var groups = path.source.match(/\((?!\?)/g)

        if (groups) {
          for (var i = 0; i < groups.length; i++) {
            keys.push({
              name: i,
              prefix: null,
              delimiter: null,
              optional: false,
              repeat: false,
              partial: false,
              asterisk: false,
              pattern: null
            })
          }
        }

        return attachKeys(path, keys)
      }

      /**
       * Transform an array into a regexp.
       *
       * @param  {!Array}  path
       * @param  {Array}   keys
       * @param  {!Object} options
       * @return {!RegExp}
       */
      function arrayToRegexp(path, keys, options) {
        var parts = []

        for (var i = 0; i < path.length; i++) {
          parts.push(pathToRegexp(path[i], keys, options).source)
        }

        var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

        return attachKeys(regexp, keys)
      }

      /**
       * Create a path regexp from string input.
       *
       * @param  {string}  path
       * @param  {!Array}  keys
       * @param  {!Object} options
       * @return {!RegExp}
       */
      function stringToRegexp(path, keys, options) {
        var tokens = parse(path)
        var re = tokensToRegExp(tokens, options)

        // Attach keys back to the regexp.
        for (var i = 0; i < tokens.length; i++) {
          if (typeof tokens[i] !== 'string') {
            keys.push(tokens[i])
          }
        }

        return attachKeys(re, keys)
      }

      /**
       * Expose a function for taking tokens and returning a RegExp.
       *
       * @param  {!Array}  tokens
       * @param  {Object=} options
       * @return {!RegExp}
       */
      function tokensToRegExp(tokens, options) {
        options = options || {}

        var strict = options.strict
        var end = options.end !== false
        var route = ''
        var lastToken = tokens[tokens.length - 1]
        var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

        // Iterate over the tokens and create our regexp string.
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i]

          if (typeof token === 'string') {
            route += escapeString(token)
          } else {
            var prefix = escapeString(token.prefix)
            var capture = '(?:' + token.pattern + ')'

            if (token.repeat) {
              capture += '(?:' + prefix + capture + ')*'
            }

            if (token.optional) {
              if (!token.partial) {
                capture = '(?:' + prefix + '(' + capture + '))?'
              } else {
                capture = prefix + '(' + capture + ')?'
              }
            } else {
              capture = prefix + '(' + capture + ')'
            }

            route += capture
          }
        }

        // In non-strict mode we allow a slash at the end of match. If the path to
        // match already ends with a slash, we remove it for consistency. The slash
        // is valid at the end of a path match, not in the middle. This is important
        // in non-ending mode, where "/test/" shouldn't match "/test//route".
        if (!strict) {
          route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
        }

        if (end) {
          route += '$'
        } else {
          // In non-ending mode, we need the capturing groups to match as much as
          // possible by using a positive lookahead to the end or next path segment.
          route += strict && endsWithSlash ? '' : '(?=\\/|$)'
        }

        return new RegExp('^' + route, flags(options))
      }

      /**
       * Normalize the given path string, returning a regular expression.
       *
       * An empty array can be passed in for the keys, which will hold the
       * placeholder key descriptions. For example, using `/user/:id`, `keys` will
       * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
       *
       * @param  {(string|RegExp|Array)} path
       * @param  {(Array|Object)=}       keys
       * @param  {Object=}               options
       * @return {!RegExp}
       */
      function pathToRegexp(path, keys, options) {
        keys = keys || []

        if (!isarray(keys)) {
          options = /** @type {!Object} */ (keys)
          keys = []
        } else if (!options) {
          options = {}
        }

        if (path instanceof RegExp) {
          return regexpToRegexp(path, /** @type {!Array} */ (keys))
        }

        if (isarray(path)) {
          return arrayToRegexp( /** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
        }

        return stringToRegexp( /** @type {string} */ (path), /** @type {!Array} */ (keys), options)
      }

    }, { "isarray": 13 }],
    15: [function(require, module, exports) {
      /**
       * Copyright 2015 Google Inc. All rights reserved.
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *     http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       *
       */

      (function() {
        var nativeAddAll = Cache.prototype.addAll;
        var userAgent = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);

        // Has nice behavior of `var` which everyone hates
        if (userAgent) {
          var agent = userAgent[1];
          var version = parseInt(userAgent[2]);
        }

        if (
          nativeAddAll && (!userAgent ||
            (agent === 'Firefox' && version >= 46) ||
            (agent === 'Chrome' && version >= 50)
          )
        ) {
          return;
        }

        Cache.prototype.addAll = function addAll(requests) {
          var cache = this;

          // Since DOMExceptions are not constructable:
          function NetworkError(message) {
            this.name = 'NetworkError';
            this.code = 19;
            this.message = message;
          }

          NetworkError.prototype = Object.create(Error.prototype);

          return Promise.resolve().then(function() {
            if (arguments.length < 1) throw new TypeError();

            // Simulate sequence<(Request or USVString)> binding:
            var sequence = [];

            requests = requests.map(function(request) {
              if (request instanceof Request) {
                return request;
              } else {
                return String(request); // may throw TypeError
              }
            });

            return Promise.all(
              requests.map(function(request) {
                if (typeof request === 'string') {
                  request = new Request(request);
                }

                var scheme = new URL(request.url).protocol;

                if (scheme !== 'http:' && scheme !== 'https:') {
                  throw new NetworkError("Invalid scheme");
                }

                return fetch(request.clone());
              })
            );
          }).then(function(responses) {
            // If some of the responses has not OK-eish status,
            // then whole operation should reject
            if (responses.some(function(response) {
                return !response.ok;
              })) {
              throw new NetworkError('Incorrect response status');
            }

            // TODO: check that requests don't overwrite one another
            // (don't think this is possible to polyfill due to opaque responses)
            return Promise.all(
              responses.map(function(response, i) {
                return cache.put(requests[i], response);
              })
            );
          }).then(function() {
            return undefined;
          });
        };

        Cache.prototype.add = function add(request) {
          return this.addAll([request]);
        };
      }());
    }, {}]
  }, {}, [12])(12)
});

// <!-- tangram:133 end-->