// <!-- tangram:134 begin-->
//<!--TMS:2505934-->
(function(global) {
  'use strict';

  var param = (function() {
    var params = {};
    var query = location.search,
      query = query.substring(query.indexOf('?') + 1);
    if (query) {
      query.split('&').forEach(function(item) {
        var pair = item.split('=');
        if (pair.length === 2) {
          params[pair[0]] = decodeURI(pair[1]);
        }
      });
    }
    return function(key) {
      return params[key] || '';
    }
  }());
  var debug = param('swdebug');
  var disable = global.disable || false;
  var originRE = /^https:\/\/m\.alibaba\.com$/;
  var cachePrefix = '',
    clear = false;
  var swclear = param('swclear');

  var host;
  if (host = param('host')) {
    originRE = new RegExp('^https:\/\/' + host.replace(/(\.)/g, '\\$1') + '$');
  }

  if (debug === 'true') {
    disable = false;
    debug = true;
  } else {
    debug = false;
  }

  if (global.cachePrefix && !disable) {
    cachePrefix = global.cachePrefix + '-';
    disable = false;
  } else {
    disable = true;
  }

  if (global.testPrefix !== 'pwa') {
    disable = true;
  }

  if (swclear === 'true') {
    disable = true;
  } else if (swclear !== 'false' && swclear) {
    cachePrefix = swclear + '-' + cachePrefix;
  }

  if (disable) {
    return;
  }

  function log() {
    debug && console.log.apply(console, ['%c%o', 'color:#0f0'].concat([].slice.call(arguments)));
  }

  function error() {
    console.log.apply(console, ['%c%o', 'color:#f00'].concat([].slice.call(arguments)));
  }

  var OFFLINE_PAGE = '/offline.htm';
  var OFFLINE_IMG = '//u.alicdn.com/mobile/img/common/product-loading.png';

  var preCacheImage = [
    '//img.alicdn.com/tps/i3/TB1My4AHXXXXXX8XXXXM6esQVXX-512-280.png'
  ];

  var preCacheRes = global.preCacheRes || [];

  var fallbackCache = [
    OFFLINE_PAGE,
    OFFLINE_IMG
  ];

  toolbox.options.cache.name = cachePrefix + 'swcache';
  toolbox.options.cache.maxAgeSeconds = 60 * 60 * 72; //72 hours
  toolbox.options.debug = debug;
  toolbox.options.networkTimeoutSeconds = 30;
  toolbox.options.successResponses = /^0|200$/;

  //默认network only
  //toolbox.router.default = toolbox.networkOnly;
  toolbox.precache(fallbackCache);
  preCache('/?from=desktop', { cache: { name: cachePrefix + 'page-cache' } });
  preCache(preCacheRes, { cache: { name: cachePrefix + 'res-cache' } });
  preCache(preCacheImage, { cache: { name: cachePrefix + 'image-cache' } });

  function preCache(list, options) {
    if (typeof list === 'string') list = [list];
    list.forEach(function(item) {
      toolbox.networkFirst(new Request(item), null, options || toolbox.options)
        .catch(function() {
          error('[ERROR]:precache:' + item.url + ' error');
        });
    });
  }

  function fallback(request) {
    log('[ERROR]:use fallback!');
    if (request.method === 'GET') {
      var headers = request.headers.get('accept');
      if (headers.includes('text/html')) {
        return toolbox.cacheOnly(new Request(OFFLINE_PAGE), null, toolbox.options);
      } else if (headers.includes('image')) {
        return toolbox.cacheOnly(new Request(OFFLINE_IMG), null, toolbox.options);
      }
    }
  }

  function imageHandler(request, values, options, method) {
    return method(request, values, options).catch(function() {
      error('[ERROR]:load image:' + request.url + ' error');
      return fallback(request, values, options);
    });
  }

  function resHandler(request, values, options, method) {
    if (request.url.indexOf('?t=') === -1) {
      method = toolbox.fastest;
      options.maxAgeSeconds = 60 * 30;
    } else {
      options.maxAgeSeconds = 60 * 60 * 24 * 30; //30天
    }
    return method.apply(null, arguments).catch(function() {
      error('[ERROR]:load res:' + request.url + ' error');
    });
  }

  function ajaxHandler(request, values, options, method) {
    var cleanUrl = request.url.replace(/\bspm=[^&]+(&|$)/, ''); //去除spm参数

    options.rewrite = cleanUrl.replace(/\b_=[^&]+(&|$)/, '');
    return method.apply(null, arguments).catch(function() {
      error('[ERROR]:load ajax:' + request.url + ' error');
    });
  }

  function htmlHandler(request, values, options, method) {
    var cleanUrl = request.url.replace(/\bspm=[^&]+(&|$)/, ''); //去除spm参数
    cleanUrl = cleanUrl.replace(/\b1=1(&|$)/, '');

    options.rewrite = cleanUrl.replace(/\btracelog=[^&]+(&|$)/, '').replace(/[?&]$/, '');
    return method.apply(null, arguments).catch(function() {
      error('[ERROR]:load html:' + request.url + ' error');
      return fallback(request, values, options);
    });
  }

  function htmlHandlerEx(request, values, options, method) {
    var cleanUrl = request.url.replace(/\bspm=[^&]+(&|$)/, ''); //去除spm参数
    cleanUrl = cleanUrl.replace(/\b1=1(&|$)/, ''); //去除spm参数

    var matches = cleanUrl.match(/[a-z0-9-_.]+=[^&]+/ig);
    if (matches && matches[0].length > 0) { //如果html后面带有多个参数,则使用网络优先策略,因为send等页面html参数由后台渲染
      log('custom strategy:', 'networkFirst', '[' + request.url + ']');
      cleanUrl = cleanUrl.replace(/\btracelog=[^&]+(&|$)/, ''); //去除tracelog参数
      options.rewrite = cleanUrl.replace(/[?&]$/, '');
      return toolbox.networkFirst.apply(null, arguments).catch(function() {
        error('[ERROR]:load html:' + request.url + ' error');
        return fallback(request, values, options);
      });
    } else {
      log('custom strategy:', 'fastest', '[' + request.url + ']');
      return htmlHandler(request, values, options, toolbox.fastest);
    }
  }

  function defaultHandler(request, values, options, method) {
    return method.apply(null, arguments).catch(function() {
      error('[ERROR]: load :' + request.url + ' error');
      return fallback(request, values, options);
    })
  }

  function proxy(method, fn) {
    return function(request, values, options) {
      log('Cache Strategy:', method && method.name || 'custom', '[' + request.url + ']');
      return fn.call(null, request, values, options, method);
    }
  }

  //recommend 类目异步接口采用fast策略 fastest
  toolbox.router.get('/api/(listMixedRecommendContent.do|category/getCategoryList.do)', proxy(toolbox.fastest, ajaxHandler), {
    origin: originRE
  });

  //detail recommend接口 fast策略 fastest
  toolbox.router.get(/\/eventdriver\/recommendEntry.do\?sceneId=7008&productId=[\d]+/, proxy(toolbox.fastest, ajaxHandler), {
    origin: /^https:\/\/utm\.alibaba\.com$/
  });

  //api接口只从网络读取  network only
  toolbox.router.get('/api/.*', proxy(toolbox.networkOnly, ajaxHandler), {
    cache: {
      name: cachePrefix + 'ajax'
    },
    origin: originRE
  });

  //类目页fastest
  toolbox.router.get('/Categories', proxy(toolbox.fastest, htmlHandler), {
    origin: originRE
  });

  //产品详情页面缓存
  toolbox.router.get('/(product|p-detail)/(.*)', proxy(toolbox.networkFirst, htmlHandler), {
    cache: {
      name: cachePrefix + 'product-cache',
      maxAgeSeconds: 60 * 60 * 24
    },
    origin: originRE
  });

  toolbox.router.get('/', proxy(toolbox.networkFirst, htmlHandler), {
    origin: originRE
  });

  //静态页面缓存,自动策略
  toolbox.router.get('/(.*\.html?)', htmlHandlerEx, {
    cache: {
      name: cachePrefix + 'page-cache'
    },
    origin: originRE
  });

  //其他页面m站页面采用网络优先策略
  toolbox.router.get('/(.*)', proxy(toolbox.networkFirst, defaultHandler), {
    origin: originRE
  });

  //搜索为networkFirst策略
  toolbox.router.get('/trade/search', proxy(toolbox.networkFirst, htmlHandler), {
    cache: {
      name: cachePrefix + 'search-cache'
    },
    origin: originRE
  });

  // 图片缓存
  toolbox.router.get('/(.*)', proxy(toolbox.cacheFirst, imageHandler), {
    cache: {
      name: cachePrefix + 'image-cache'
    },
    maxAgeSeconds: 60 * 60 * 24 * 30,
    origin: /^https:\/\/.*(is|sc|gw|img|\.s).*\.alicdn\.com$/
  });

  //*.alicdn资源缓存为cacheFirst
  toolbox.router.get('/(.*)', proxy(toolbox.cacheFirst, resHandler), {
    cache: {
      name: cachePrefix + 'res-cache'
    },
    successResponses: /^0|([12]\d\d)$/,
    origin: /^https:\/\/(u|g|i)\.alicdn\.com$/
  });

  //DCMS 异步接口采用networkFirst策略
  toolbox.router.get('/open/query.json', proxy(toolbox.networkFirst, ajaxHandler), {
    origin: /^https:\/\/dcms\.alibaba\.com$/
  });

  //UTM 异步接口采用networkFirst策略
  toolbox.router.get('/eventdriver/recommendEntry.do', proxy(toolbox.networkFirst, ajaxHandler), {
    origin: /^https:\/\/utm\.alibaba\.com$/
  })

  //RFQ 异步接口采用networkFirst策略
  toolbox.router.get('/wap/ark/arkCategoryRecommendAjax.do', proxy(toolbox.networkFirst, ajaxHandler), {
    origin: /^https:\/\/rfq\.alibaba\.com$/
  })

})(self);

// <!-- tangram:134 end-->
;