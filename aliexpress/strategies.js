"use strict";
(function(e) {
  var t = toolbox.options || {};
  var o = t.debug;
  var r = t.successResponses;
  var n = e.swConfig || {};
  var c = n.cacheDetail || {};
  var s = n.cacheStore || {};
  var a = n.version || "100";
  var u = n.defaultMaxAgeSeconds || 5 * 60;
  var i = "AliExpress_";
  var l = "/statuspages/net_error.htm";
  var h = i + a;
  e.addEventListener("install", function(t) {
    t.waitUntil(e.skipWaiting())
  });
  e.addEventListener("activate", function(t) {
    t.waitUntil(e.clients.claim().then(d))
  });
  toolbox.router.get("*.js", function(e, t, o) {
    var r = e.url;
    var n = new Request(r, {
      mode: "no-cors"
    });
    return toolbox.cacheFirst(n, t, o)
  }, {
    origin: "https://www.google-analytics.com"
  });
  toolbox.router.get("*.js", function(e, t, o) {
    var r = e.url;
    var n = new Request(r, {
      mode: "no-cors"
    });
    return toolbox.cacheFirst(n, t, o)
  }, {
    origin: "https://ssl.google-analytics.com"
  });
  toolbox.router.get("/js/(.*)", toolbox.cacheFirst);
  toolbox.router.get("/*.(jpg|jpeg|png|svg|ico)", toolbox.cacheFirst);
  toolbox.router.get("/(.*)", toolbox.cacheFirst, {
    origin: /(i|u|is|img)\.alicdn\.com$/,
    cache: {
      name: x("alicdn")
    },
    successResponses: /^([123]\d\d)|(40[14567])|410$/
  });
  if (c.intercept && !!c.url) {
    toolbox.router.get(c.path, function(e, t, o) {
      return toolbox.fastest(new Request(c.url), t, o) || m()
    }, {
      maxAgeSeconds: c.maxAgeSeconds || u,
      successResponses: c.successResponses || /^([23]\d\d)$/
    })
  }
  if (s.intercept && !!s.url) {
    toolbox.router.get(s.path, function(e, t, o) {
      return toolbox.fastest(new Request(s.url), t, o) || m()
    }, {
      maxAgeSeconds: s.maxAgeSeconds || u,
      successResponses: s.successResponses || /^([23]\d\d)$/
    })
  }
  toolbox.router.get("/", toolbox.networkFirst, {
    cache: {
      name: x("html")
    }
  });
  toolbox.router.get("/categoryList.htm(l)?", function(e, t, o) {
    return g(e, t, o)
  }, {
    maxAgeSeconds: u,
    cache: {
      name: x("html")
    }
  });
  toolbox.router.get("/category/*.htm(l)?", function(e, t, o) {
    return g(e, t, o)
  }, {
    maxAgeSeconds: u,
    cache: {
      name: x("html")
    }
  });
  toolbox.router.get("/search.htm(l)?", function(e, t, o) {
    return g(e, t, o)
  }, {
    maxAgeSeconds: u,
    cache: {
      name: x("html")
    }
  });
  toolbox.router.get("/order/*.htm(l)?", toolbox.networkFirst, {
    maxAgeSeconds: u,
    cache: {
      name: x("html")
    }
  });
  toolbox.router.get("/*.htm(l)?", function(e, t, r) {
    var n = e.headers.get("accept");
    var c = /text\/html/i;
    var s = e.url;
    if (!c.test(n)) {
      return toolbox.networkFirst(e, t, r)
    }
    return toolbox.networkFirst(e, t, r).then(function(e) {
      return e || m()
    }).catch(function(t) {
      o && console.log("[sw] network error,html get from cache, url: ", e.url, "\n error:", t);
      return m()
    })
  }, {
    maxAgeSeconds: u,
    cache: {
      name: x("html")
    }
  });

  function g(e, t, r) {
    return toolbox.fastest(e, t, r).then(function(e) {
      return e || m()
    }).catch(function(e) {
      o && console.log("[sw] fastestHandlerForHtml error: ", e);
      return m()
    })
  }

  function m() {
    return f().then(function(e) {
      return e.match(new Request(l))
    })
  }

  function x(e) {
    return (i + e + "_" + a).toLowerCase()
  }

  function f(e) {
    var o;
    if (e && e.cache) {
      o = e.cache.name
    }
    o = o || t.cache.name;
    return caches.open(o)
  }

  function d() {
    var e = new RegExp(i, "i");
    var t = new RegExp(a, "i");
    return caches.keys().then(function(o) {
      return Promise.all(o.filter(function(o) {
        return e.test(o) && !t.test(o)
      }).map(function(e) {
        return caches.delete(e)
      }))
    })
  }
})(self);