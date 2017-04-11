(function(global) {
  // <!-- tangram:131 begin-->

  var preCacheRes = [
    '//u.alicdn.com/mobile/g/common/atom/3.0.0/??atom.js?t=cd8083ae_30fa5921a5',
    '//u.alicdn.com/mobile/g/common/apollo/1.2.4/??apollo.css?t=fa66ca86_7d1baa247',
  ];
  if (!global) global = {};
  global.cachePrefix = 'v0.1.11';
  global.disable = false;
  global.search = location.search;
  global.testPrefix = 'pwa';
  global.preCacheRes = preCacheRes;

  console.log('cache prefix:', global.cachePrefix, 'disable:', global.disable);

  function require(script) {
    importScripts(script + global.search + '&cachePrefix=' + global.cachePrefix);
  }

  //cache
  require('sw-toolbox/cache.js');
  require('sw-toolbox/cacheConfig.js');

  self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
  });

  self.addEventListener('activate', function(event) {
    return self.clients.claim();
  });

  global.clearCache = function clearCache() {
    return caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    });
  }
  global.clearCache();
  /*
  lang: english
  swdebug:
  swclear:
  */
  // <!-- tangram:131 end-->
}(self));