"use strict";
var root = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : this;
var CACHE_DETAIL_URL = "/s/item/32696115470.html";
var CACHE_STORE_URL = "/store/2299004";
var swConfig = root.swConfig = {
  version: "121",
  defaultMaxAgeSeconds: 5 * 60,
  debug: false,
  cacheDetail: {
    url: CACHE_DETAIL_URL,
    path: "/s/item/*.html",
    maxAgeSeconds: 5 * 60,
    intercept: true,
    successResponses: /^([23]\d\d)$/
  },
  cacheStore: {
    url: CACHE_STORE_URL,
    path: "/store/:id(\\d+)",
    maxAgeSeconds: 5 * 60,
    intercept: true,
    successResponses: /^([23]\d\d)$/
  }
};
importScripts("//i.alicdn.com/aefe-mobile-global/pwa/lib/sw-toolbox.1a647481.js");
toolbox.options.debug = swConfig.debug;
var precacheAssets = [CACHE_DETAIL_URL, CACHE_STORE_URL, "/statuspages/net_error.htm", "/manifest.json", "/img/android-chrome-96x96.png", "/img/android-chrome-144x144.png", "/img/android-chrome-192x192.png", "//i.alicdn.com/aefe-mobile-global/timing/??page-timing.16013dc3.js", "//i.alicdn.com/aefe-mobile-global/standalone/venus.9c9e32b7.js", "//i.alicdn.com/aefe-mobile-global/static/assets/iconfontmd.6eb7d08b.ttf", "//i.alicdn.com/ae-mobile/common/iconfont/iconfont.b573ce3e.ttf"];
toolbox.precache(precacheAssets);
importScripts("//i.alicdn.com/aefe-mobile-global/pwa/strategies.94b3c069.js");