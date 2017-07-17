importScripts('sw-toolbox.js');
const MAX_AGE_HOURS = 24;
self.toolbox.precache(['/offline.html', 'https://mcdn.belezanaweb.com.br/image/upload/f_svg,fl_progressive,q_auto:best/blz/static/1/assets/img/beleza-logo.svg']);
self.toolbox.router.get(/(svg|png|jpg|gif|webp)$/, self.toolbox.cacheFirst, {
  cache: {
    name: 'blz-imgs',
    maxAgeSeconds: MAX_AGE_HOURS * 60 * 60
  }
});
self.toolbox.router.get('/(.*)', function(req, vals, opts) {
  return toolbox.networkOnly(req, vals, opts).catch(function(error) {
    if (req.method === 'GET' && req.headers.get('accept').includes('text/html')) {
      return toolbox.cacheOnly(new Request('/offline.html'), vals, opts);
    }
    throw error;
  });
});
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));