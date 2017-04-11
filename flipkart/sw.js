! function(e) {
  function t(r) {
    if (n[r])
      return n[r].exports;
    var o = n[r] = {
      exports: {},
      id: r,
      loaded: !1
    };
    return e[r].call(o.exports, o, o.exports, t),
      o.loaded = !0,
      o.exports
  }
  var n = {};
  return t.m = e,
    t.c = n,
    t.p = "",
    t(0)
}([function(e, t, n) {
  "use strict";

  function r(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function o() {
    var e = new Request("https://www.flipkart.com/SWVERSION", {
      method: "get",
      headers: null,
      body: null,
      mode: null,
      credentials: null,
      cache: null,
      redirect: null,
      referrer: null,
      integrity: null
    });
    return w.default.openCache({
      cache: {
        name: "SWVERSION",
        maxAgeSeconds: null,
        maxEntries: null
      }
    }).then(function(t) {
      return t.match(e.clone()).then(function(n) {
        var r = new Response(k);
        return n ? n ? n.json().then(function(n) {
          if (n !== k)
            return t.put(e, r),
              self.clients.matchAll().then(function(e) {
                return Promise.all(e.map(function(e) {
                  return e.postMessage(JSON.stringify({
                    cacheversion: n
                  }))
                }))
              })
        }) : void 0 : t.put(e, r).catch(function(e) {
          throw console.log(e),
            e
        })
      })
    }).catch(function(e) {
      throw e
    })
  }

  function a(e, t) {
    var n = e.url;
    return n.indexOf("start") === -1 ? g.default.networkFirst(e, t, $) : fetch(e)
  }

  function i(e, t, n) {
    var r = new Request(e.url, {
      headers: e.headers,
      mode: "cors"
    });
    return g.default.cacheFirst(r, t, n)
  }

  function c(e, t, n) {
    return w.default.openCache(n).then(function(t) {
      return t.match(e.clone()).then(function(n) {
        var r = fetch(e.clone()).then(function(r) {
          return s(e, r, t, !!n)
        }).catch(function(e) {
          return self.clients.matchAll().then(function(t) {
            return Promise.all(t.map(function(t) {
              return t.postMessage(JSON.stringify({
                error: e,
                hpResponse: null
              }))
            }))
          })
        });
        return n || r
      })
    }).catch(function(e) {
      throw e
    })
  }

  function s(e, t, n, r) {
    if (t.ok && g.default.options.successResponses.test(t.status))
      return t.clone().json().then(function(o) {
        delete o.SESSION;
        var a = new Response(JSON.stringify(o), {
          status: t.status,
          statusText: t.statusText
        });
        return n.put(e.clone(), a.clone()),
          r ? self.clients.matchAll().then(function(e) {
            return Promise.all(e.map(function(e) {
              return e.postMessage(JSON.stringify({
                hpResponse: o
              }))
            }))
          }) : a
      }).catch(function(e) {
        throw console.error(e),
          e
      });
    if (!t.ok) {
      var o = function() {
        var e = {
          statusCode: t.status,
          message: t.statusText
        };
        return {
          v: self.clients.matchAll().then(function(t) {
            return Promise.all(t.map(function(t) {
              return t.postMessage(JSON.stringify({
                error: e,
                hpResponse: null
              }))
            }))
          })
        }
      }();
      if ("object" === (void 0 === o ? "undefined" : d(o)))
        return o.v
    }
  }

  function u(e) {
    return w.default.openCache(P).then(function(t) {
      return t.match(e.clone()).then(function(t) {
        var n = w.default.fetchAndCache(e, P);
        return t ? t : n
      })
    }).catch(function(e) {
      throw console.log(e),
        e
    })
  }

  function l(e) {
    return u(new Request(new URL(e.url).pathname, {
      headers: e.headers,
      credentials: "same-origin"
    }))
  }

  function f(e) {
    return u(new Request("/search", {
      headers: e.headers,
      credentials: "same-origin"
    }))
  }

  function h(e) {
    return u(new Request("/" + C.slug + "/p/" + C.itemId, {
      headers: e.headers,
      credentials: "same-origin"
    }))
  }

  function p(e) {
    var t = e.request.ajaxConfig.protocol + "://" + e.request.ajaxConfig.hostname + e.request.ajaxConfig.pathname;
    return fetch(t, {
      method: e.request.ajaxConfig.method.toLowerCase(),
      headers: e.request.ajaxConfig.headers,
      body: JSON.stringify(e.body),
      credentials: "include"
    }).then(function() {
      return S.default.delete("PushNotification")
    })
  }
  var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } :
    function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    m = n(1),
    g = r(m),
    v = n(7),
    w = r(v),
    y = n(17),
    x = r(y),
    b = n(18),
    S = r(b),
    k = 26,
    E = ["fkart6", "reviews", "productInfo", "sellerSummary", "flyout1", "search", "fkartStatic", "mainStatic2", "mainBundles3", "offerTC", "logoStatic", "userState", "swatchServiceability", "allSellers", "discoveryContent", "userReviewOverview", "homePage"],
    R = {};
  E.forEach(function(e) {
      R[e] = e + k
    }),
    g.default.options.cache.name = R.fkart6,
    g.default.options.successResponses = /^0|200$/;
  var C = {
      splat: "splat",
      slug: "slug",
      itemId: "Flipkart"
    },
    A = [];
  A.push("/"),
    A.push("/search"),
    A.push("/" + C.slug + "/p/" + C.itemId),
    g.default.precache(A);
  var O = {
    headers: {
      "X-user-agent": self.navigator.userAgent + "FKUA/msite/0.0.1/msite/Mobile",
      "Content-Type": "application/json"
    }
  };
  self.addEventListener("install", function(e) {
      var t = new Request("/api/br/data/flyout", O);
      e.waitUntil(caches.open(R.flyout1).then(function(e) {
          return fetch(t).then(function(n) {
            return e.put(t, n.clone())
          })
        })),
        e.waitUntil(self.skipWaiting())
    }),
    self.addEventListener("activate", function(e) {
      e.waitUntil(caches.keys().then(function(e) {
          var t = Object.keys(R).map(function(e) {
            return R[e]
          });
          return Promise.all(e.map(function(e) {
            return t.indexOf(e) === -1 && e.indexOf("$$$inactive$$$") === -1 && e.indexOf("SWVERSION") === -1 ? (console.log("Deleting out of date cache:", e),
              caches.delete(e)) : Promise.resolve()
          }))
        })),
        e.waitUntil(self.clients.claim().then(function() {
          return o()
        }))
    });
  var $ = {
      cache: {
        name: R.search,
        maxEntries: 5,
        maxAgeSeconds: 300
      }
    },
    P = {
      cache: {
        name: R.fkart6,
        maxAgeSeconds: null,
        maxEntries: null
      }
    };
  g.default.router.get("/api/1/product/smart-browse", a),
    g.default.router.get("/api/3/product/reviews", g.default.networkFirst, {
      cache: {
        name: R.reviews,
        maxEntries: 5
      }
    }),
    g.default.router.get("/api/3/page/dynamic/product", g.default.networkFirst, {
      cache: {
        name: R.productInfo,
        maxEntries: 25,
        maxAgeSeconds: 604800
      }
    }),
    g.default.router.get("/api/br/data/flyout", g.default.fastest, {
      cache: {
        name: R.flyout1
      }
    }),
    g.default.router.get("/api/2/discover/santaOfferDetails", g.default.networkFirst, {
      cache: {
        name: R.offerTC
      }
    }),
    g.default.router.get("/api/3/user/state", g.default.networkFirst, {
      cache: {
        name: R.userState
      }
    }),
    g.default.router.get("/api/3/product/serviceability", g.default.networkFirst, {
      cache: {
        name: R.swatchServiceability
      }
    }),
    g.default.router.get("/api/3/page/product/sellers", g.default.networkFirst, {
      cache: {
        name: R.allSellers
      }
    }),
    g.default.router.get("/api/3/discover/discovery/content", g.default.networkFirst, {
      cache: {
        name: R.discoveryContent
      }
    }),
    g.default.router.get("/api/3/reviews/product/detail", g.default.networkFirst, {
      cache: {
        name: R.userReviewOverview
      }
    }),
    g.default.router.get("/api/3/resource/msite/appConfigs", g.default.networkFirst, {
      cache: {
        name: R.config,
        maxAgeSeconds: 86400
      }
    }),
    g.default.router.get("/api/3/layout/page/homepage", g.default.networkFirst, {
      cache: {
        name: R.homePage
      }
    }),
    g.default.router.get("/api/3/page/homepage", c, {
      cache: {
        name: R.homePage
      }
    }),
    g.default.router.get("/www/linchpin/batman-returns/images/logo_lite-cbb3574d.png", i, {
      origin: "https://img1a.flixcart.com",
      cache: {
        name: R.logoStatic,
        maxEntries: 1
      }
    }),
    g.default.router.get("/www/linchpin/batman-returns/images/(.*)", g.default.cacheFirst, {
      origin: "https://img1a.flixcart.com",
      cache: {
        name: R.mainStatic2,
        maxEntries: 50
      }
    }),
    g.default.router.get("/www/linchpin/batman-returns/(.*)", i, {
      origin: "https://img1a.flixcart.com",
      cache: {
        name: R.mainBundles3,
        maxEntries: 20
      }
    }),
    g.default.router.get("/(.*)", g.default.cacheFirst, {
      origin: "https://rukminim1.flixcart.com",
      cache: {
        name: R.fkartStatic,
        maxEntries: 50
      }
    }),
    g.default.router.get("/search", f),
    g.default.router.get("/(.*)/pr", f),
    g.default.router.get("/:slug/p/:itemId", h),
    g.default.router.get("/", l),
    self.addEventListener("push", function(e) {
      if (e && e.data)
        try {
          var t = e.data.json(),
            n = t.payload;
          n && ! function() {
            var r = n.title ? n.title : "You have received a new notification",
              o = {
                body: n.body,
                icon: n.icon,
                image: n.image,
                tag: n.tag,
                data: t,
                badge: "https://rukminim1.flixcart.com/www/192/192/promos/03/04/2017/0500b399-8420-49d6-b74a-381553306ee9.png?q=90"
              };
            n.actions && n.actions.length > 0 && (o.actions = [],
                n.actions.forEach(function(e) {
                  o.actions.push({
                    icon: e.icon,
                    title: e.title,
                    action: e.action
                  })
                })),
              e.waitUntil(Promise.all([self.registration.showNotification(r, o), (0,
                x.default)("RECEIVED", t)]))
          }()
        } catch (e) {}
    }),
    self.addEventListener("notificationclick", function(e) {
      e.notification.close();
      var t = void 0;
      if (e.action) {
        var n = e && e.notification && e.notification.data && e.notification.data.payload ? e.notification.data.payload.actions : null;
        if (n && Array.isArray(n)) {
          var r = n.filter(function(t) {
            return e.action === t.action
          });
          1 === r.length && (t = r[0].landingUrl)
        }
      } else
        t = e.notification.data.payload.landingUrl;
      t && e.waitUntil(clients.matchAll({
        includeUncontrolled: !0,
        type: "window"
      }).then(function(n) {
        var r = null;
        (0,
          x.default)("READ", e.notification.data);
        for (var o = 0; n.length > o; o++) {
          var a = n[o];
          if (a.url === t || /flipkart\.com\/?$/.test(t) && /flipkart\.com\/?$/.test(a.url)) {
            r = a;
            break
          }
        }
        return r ? r.focus() : clients.openWindow(t)
      }))
    }),
    self.addEventListener("notificationclose", function(e) {
      e.waitUntil((0,
        x.default)("DISMISS", e.notification.data))
    }),
    self.addEventListener("sync", function(e) {
      "PNRegistration" === e.tag && e.waitUntil(S.default.get("PushNotification").then(function(e) {
        var t = JSON.parse(e),
          n = t.request.ajaxConfig.protocol + "//" + t.request.ajaxConfig.hostname + "/3/user/state";
        return fetch(n, {
          headers: {
            "X-User-Agent": self.navigator.userAgent + " FKUA/msite/0.0.1/msite/Mobile",
            "Content-Type": "application/json"
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify({})
        }).then(function(e) {
          return e.json().then(function(e) {
            return e && e.SESSION && e.SESSION.isLoggedIn ? p(t) : null
          })
        })
      }))
    })
}, function(e, t, n) {
  "use strict";
  var r = n(2),
    o = n(3),
    a = n(7),
    i = n(9),
    c = n(15);
  a.debug("Service Worker Toolbox is loading"),
    self.addEventListener("install", c.installListener),
    self.addEventListener("activate", c.activateListener),
    self.addEventListener("fetch", c.fetchListener),
    e.exports = {
      networkOnly: i.networkOnly,
      networkFirst: i.networkFirst,
      cacheOnly: i.cacheOnly,
      cacheFirst: i.cacheFirst,
      fastest: i.fastest,
      router: o,
      options: r,
      cache: a.cache,
      uncache: a.uncache,
      precache: a.precache
    }
}, function(e, t) {
  "use strict";
  var n;
  n = self.registration ? self.registration.scope : self.scope || new URL("./", self.location).href,
    e.exports = {
      cache: {
        name: "$$$toolbox-cache$$$" + n + "$$$",
        maxAgeSeconds: null,
        maxEntries: null,
        queryOptions: null
      },
      debug: !1,
      networkTimeoutSeconds: null,
      preCacheItems: [],
      successResponses: /^0|([123]\d\d)|(40[14567])|410$/
    }
}, function(e, t, n) {
  "use strict";

  function r(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  }
  var o = n(4),
    a = n(7),
    i = function(e, t) {
      for (var n = e.entries(), r = n.next(), o = []; !r.done;) {
        var a = RegExp(r.value[0]);
        a.test(t) && o.push(r.value[1]),
          r = n.next()
      }
      return o
    },
    c = function() {
      this.routes = new Map,
        this.routes.set(RegExp, new Map),
        this.default = null
    };
  ["get", "post", "put", "delete", "head", "any"].forEach(function(e) {
      c.prototype[e] = function(t, n, r) {
        return this.add(e, t, n, r)
      }
    }),
    c.prototype.add = function(e, t, n, i) {
      i = i || {};
      var c;
      t instanceof RegExp ? c = RegExp : (c = i.origin || self.location.origin,
          c = c instanceof RegExp ? c.source : r(c)),
        e = e.toLowerCase();
      var s = new o(e, t, n, i);
      this.routes.has(c) || this.routes.set(c, new Map);
      var u = this.routes.get(c);
      u.has(e) || u.set(e, new Map);
      var l = u.get(e),
        f = s.regexp || s.fullUrlRegExp;
      l.has(f.source) && a.debug('"' + t + '" resolves to same regex as existing route.'),
        l.set(f.source, s)
    },
    c.prototype.matchMethod = function(e, t) {
      var n = new URL(t),
        r = n.origin,
        o = n.pathname;
      return this._match(e, i(this.routes, r), o) || this._match(e, [this.routes.get(RegExp)], t)
    },
    c.prototype._match = function(e, t, n) {
      if (0 === t.length)
        return null;
      for (var r = 0; t.length > r; r++) {
        var o = t[r],
          a = o && o.get(e.toLowerCase());
        if (a) {
          var c = i(a, n);
          if (c.length > 0)
            return c[0].makeHandler(n)
        }
      }
      return null
    },
    c.prototype.match = function(e) {
      return this.matchMethod(e.method, e.url) || this.matchMethod("any", e.url)
    },
    e.exports = new c
}, function(e, t, n) {
  "use strict";
  var r = new URL("./", self.location),
    o = r.pathname,
    a = n(5),
    i = function(e, t, n, r) {
      t instanceof RegExp ? this.fullUrlRegExp = t : (0 !== t.indexOf("/") && (t = o + t),
          this.keys = [],
          this.regexp = a(t, this.keys)),
        this.method = e,
        this.options = r,
        this.handler = n
    };
  i.prototype.makeHandler = function(e) {
      var t;
      if (this.regexp) {
        var n = this.regexp.exec(e);
        t = {},
          this.keys.forEach(function(e, r) {
            t[e.name] = n[r + 1]
          })
      }
      return function(e) {
          return this.handler(e, t, this.options)
        }
        .bind(this)
    },
    e.exports = i
}, function(e, t, n) {
  function r(e, t) {
    for (var n, r = [], o = 0, a = 0, i = "", c = t && t.delimiter || "/"; null != (n = w.exec(e));) {
      var l = n[0],
        f = n[1],
        h = n.index;
      if (i += e.slice(a, h),
        a = h + l.length,
        f)
        i += f[1];
      else {
        var p = e[a],
          d = n[2],
          m = n[3],
          g = n[4],
          v = n[5],
          y = n[6],
          x = n[7];
        i && (r.push(i),
          i = "");
        var b = null != d && null != p && p !== d,
          S = "+" === y || "*" === y,
          k = "?" === y || "*" === y,
          E = n[2] || c,
          R = g || v;
        r.push({
          name: m || o++,
          prefix: d || "",
          delimiter: E,
          optional: k,
          repeat: S,
          partial: b,
          asterisk: !!x,
          pattern: R ? u(R) : x ? ".*" : "[^" + s(E) + "]+?"
        })
      }
    }
    return e.length > a && (i += e.substr(a)),
      i && r.push(i),
      r
  }

  function o(e, t) {
    return c(r(e, t))
  }

  function a(e) {
    return encodeURI(e).replace(/[\/?#]/g, function(e) {
      return "%" + e.charCodeAt(0).toString(16).toUpperCase()
    })
  }

  function i(e) {
    return encodeURI(e).replace(/[?#]/g, function(e) {
      return "%" + e.charCodeAt(0).toString(16).toUpperCase()
    })
  }

  function c(e) {
    for (var t = Array(e.length), n = 0; e.length > n; n++)
      "object" == typeof e[n] && (t[n] = RegExp("^(?:" + e[n].pattern + ")$"));
    return function(n, r) {
      for (var o = "", c = n || {}, s = r || {}, u = s.pretty ? a : encodeURIComponent, l = 0; e.length > l; l++) {
        var f = e[l];
        if ("string" != typeof f) {
          var h, p = c[f.name];
          if (null == p) {
            if (f.optional) {
              f.partial && (o += f.prefix);
              continue
            }
            throw new TypeError('Expected "' + f.name + '" to be defined')
          }
          if (v(p)) {
            if (!f.repeat)
              throw new TypeError('Expected "' + f.name + '" to not repeat, but received `' + JSON.stringify(p) + "`");
            if (0 === p.length) {
              if (f.optional)
                continue;
              throw new TypeError('Expected "' + f.name + '" to not be empty')
            }
            for (var d = 0; p.length > d; d++) {
              if (h = u(p[d]), !t[l].test(h))
                throw new TypeError('Expected all "' + f.name + '" to match "' + f.pattern + '", but received `' + JSON.stringify(h) + "`");
              o += (0 === d ? f.prefix : f.delimiter) + h
            }
          } else {
            if (h = f.asterisk ? i(p) : u(p), !t[l].test(h))
              throw new TypeError('Expected "' + f.name + '" to match "' + f.pattern + '", but received "' + h + '"');
            o += f.prefix + h
          }
        } else
          o += f
      }
      return o
    }
  }

  function s(e) {
    return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1")
  }

  function u(e) {
    return e.replace(/([=!:$\/()])/g, "\\$1")
  }

  function l(e, t) {
    return e.keys = t,
      e
  }

  function f(e) {
    return e.sensitive ? "" : "i"
  }

  function h(e, t) {
    var n = e.source.match(/\((?!\?)/g);
    if (n)
      for (var r = 0; n.length > r; r++)
        t.push({
          name: r,
          prefix: null,
          delimiter: null,
          optional: !1,
          repeat: !1,
          partial: !1,
          asterisk: !1,
          pattern: null
        });
    return l(e, t)
  }

  function p(e, t, n) {
    for (var r = [], o = 0; e.length > o; o++)
      r.push(g(e[o], t, n).source);
    var a = RegExp("(?:" + r.join("|") + ")", f(n));
    return l(a, t)
  }

  function d(e, t, n) {
    return m(r(e, n), t, n)
  }

  function m(e, t, n) {
    v(t) || (n = t || n,
        t = []),
      n = n || {};
    for (var r = n.strict, o = n.end !== !1, a = "", i = 0; e.length > i; i++) {
      var c = e[i];
      if ("string" == typeof c)
        a += s(c);
      else {
        var u = s(c.prefix),
          h = "(?:" + c.pattern + ")";
        t.push(c),
          c.repeat && (h += "(?:" + u + h + ")*"),
          h = c.optional ? c.partial ? u + "(" + h + ")?" : "(?:" + u + "(" + h + "))?" : u + "(" + h + ")",
          a += h
      }
    }
    var p = s(n.delimiter || "/"),
      d = a.slice(-p.length) === p;
    return r || (a = (d ? a.slice(0, -p.length) : a) + "(?:" + p + "(?=$))?"),
      a += o ? "$" : r && d ? "" : "(?=" + p + "|$)",
      l(RegExp("^" + a, f(n)), t)
  }

  function g(e, t, n) {
    return v(t) || (n = t || n,
        t = []),
      n = n || {},
      e instanceof RegExp ? h(e, t) : v(e) ? p(e, t, n) : d(e, t, n)
  }
  var v = n(6);
  e.exports = g,
    e.exports.parse = r,
    e.exports.compile = o,
    e.exports.tokensToFunction = c,
    e.exports.tokensToRegExp = m;
  var w = RegExp("(\\\\.)|([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))", "g")
}, function(e, t) {
  e.exports = Array.isArray || function(e) {
    return "[object Array]" == Object.prototype.toString.call(e)
  }
}, function(e, t, n) {
  "use strict";

  function r(e, t) {
    t = t || {};
    var n = t.debug || m.debug;
    n && console.log("[sw-toolbox] " + e)
  }

  function o(e) {
    var t;
    return e && e.cache && (t = e.cache.name),
      t = t || m.cache.name,
      caches.open(t)
  }

  function a(e, t) {
    t = t || {};
    var n = t.successResponses || m.successResponses;
    return fetch(e.clone()).then(function(r) {
      return "GET" === e.method && n.test(r.status) && o(t).then(function(n) {
          n.put(e, r).then(function() {
            var r = t.cache || m.cache;
            (r.maxEntries || r.maxAgeSeconds) && r.name && i(e, n, r)
          })
        }),
        r.clone()
    })
  }

  function i(e, t, n) {
    var r = c.bind(null, e, t, n);
    d = d ? d.then(r) : r()
  }

  function c(e, t, n) {
    var o = e.url,
      a = n.maxAgeSeconds,
      i = n.maxEntries,
      c = n.name,
      s = Date.now();
    return r("Updating LRU order for " + o + ". Max entries is " + i + ", max age is " + a),
      g.getDb(c).then(function(e) {
        return g.setTimestampForUrl(e, o, s)
      }).then(function(e) {
        return g.expireEntries(e, i, a, s)
      }).then(function(e) {
        r("Successfully updated IDB.");
        var n = e.map(function(e) {
          return t.delete(e)
        });
        return Promise.all(n).then(function() {
          r("Done with cache cleanup.")
        })
      }).catch(function(e) {
        r(e)
      })
  }

  function s(e, t, n) {
    return r("Renaming cache: [" + e + "] to [" + t + "]", n),
      caches.delete(t).then(function() {
        return Promise.all([caches.open(e), caches.open(t)]).then(function(t) {
          var n = t[0],
            r = t[1];
          return n.keys().then(function(e) {
            return Promise.all(e.map(function(e) {
              return n.match(e).then(function(t) {
                return r.put(e, t)
              })
            }))
          }).then(function() {
            return caches.delete(e)
          })
        })
      })
  }

  function u(e, t) {
    return o(t).then(function(t) {
      return t.add(e)
    })
  }

  function l(e, t) {
    return o(t).then(function(t) {
      return t.delete(e)
    })
  }

  function f(e) {
    e instanceof Promise || h(e),
      m.preCacheItems = m.preCacheItems.concat(e)
  }

  function h(e) {
    var t = Array.isArray(e);
    if (t && e.forEach(function(e) {
        "string" == typeof e || e instanceof Request || (t = !1)
      }), !t)
      throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");
    return e
  }

  function p(e, t, n) {
    if (!e)
      return !1;
    if (t) {
      var r = e.headers.get("date");
      if (r) {
        var o = new Date(r);
        if (o.getTime() + 1e3 * t < n)
          return !1
      }
    }
    return !0
  }
  var d, m = n(2),
    g = n(8);
  e.exports = {
    debug: r,
    fetchAndCache: a,
    openCache: o,
    renameCache: s,
    cache: u,
    uncache: l,
    precache: f,
    validatePrecacheInput: h,
    isResponseFresh: p
  }
}, function(e, t) {
  "use strict";

  function n(e) {
    return new Promise(function(t, n) {
      var r = indexedDB.open(s + e, u);
      r.onupgradeneeded = function() {
          var e = r.result.createObjectStore(l, {
            keyPath: f
          });
          e.createIndex(h, h, {
            unique: !1
          })
        },
        r.onsuccess = function() {
          t(r.result)
        },
        r.onerror = function() {
          n(r.error)
        }
    })
  }

  function r(e) {
    return e in p || (p[e] = n(e)),
      p[e]
  }

  function o(e, t, n) {
    return new Promise(function(r, o) {
      var a = e.transaction(l, "readwrite"),
        i = a.objectStore(l);
      i.put({
          url: t,
          timestamp: n
        }),
        a.oncomplete = function() {
          r(e)
        },
        a.onabort = function() {
          o(a.error)
        }
    })
  }

  function a(e, t, n) {
    return t ? new Promise(function(r, o) {
      var a = 1e3 * t,
        i = [],
        c = e.transaction(l, "readwrite"),
        s = c.objectStore(l),
        u = s.index(h);
      u.openCursor().onsuccess = function(e) {
          var t = e.target.result;
          if (t && n - a > t.value[h]) {
            var r = t.value[f];
            i.push(r),
              s.delete(r),
              t.continue()
          }
        },
        c.oncomplete = function() {
          r(i)
        },
        c.onabort = o
    }) : Promise.resolve([])
  }

  function i(e, t) {
    return t ? new Promise(function(n, r) {
      var o = [],
        a = e.transaction(l, "readwrite"),
        i = a.objectStore(l),
        c = i.index(h),
        s = c.count();
      c.count().onsuccess = function() {
          var e = s.result;
          e > t && (c.openCursor().onsuccess = function(n) {
            var r = n.target.result;
            if (r) {
              var a = r.value[f];
              o.push(a),
                i.delete(a),
                e - o.length > t && r.continue()
            }
          })
        },
        a.oncomplete = function() {
          n(o)
        },
        a.onabort = r
    }) : Promise.resolve([])
  }

  function c(e, t, n, r) {
    return a(e, n, r).then(function(n) {
      return i(e, t).then(function(e) {
        return n.concat(e)
      })
    })
  }
  var s = "sw-toolbox-",
    u = 1,
    l = "store",
    f = "url",
    h = "timestamp",
    p = {};
  e.exports = {
    getDb: r,
    setTimestampForUrl: o,
    expireEntries: c
  }
}, function(e, t, n) {
  e.exports = {
    networkOnly: n(10),
    networkFirst: n(11),
    cacheOnly: n(12),
    cacheFirst: n(13),
    fastest: n(14)
  }
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
    return o.debug("Strategy: network only [" + e.url + "]", n),
      fetch(e)
  }
  var o = n(7);
  e.exports = r
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
    n = n || {};
    var r = n.cache || o.cache,
      i = r.queryOptions,
      c = n.successResponses || o.successResponses,
      s = n.networkTimeoutSeconds || o.networkTimeoutSeconds;
    return a.debug("Strategy: network first [" + e.url + "]", n),
      a.openCache(n).then(function(t) {
        var o, u, l = [];
        if (s) {
          var f = new Promise(function(n) {
            o = setTimeout(function() {
              t.match(e, i).then(function(e) {
                var t = Date.now(),
                  o = r.maxAgeSeconds;
                a.isResponseFresh(e, o, t) && n(e)
              })
            }, 1e3 * s)
          });
          l.push(f)
        }
        var h = a.fetchAndCache(e, n).then(function(e) {
          if (o && clearTimeout(o),
            c.test(e.status))
            return e;
          throw a.debug("Response was an HTTP error: " + e.statusText, n),
            u = e,
            Error("Bad response")
        }).catch(function(r) {
          return a.debug("Network or response error, fallback to cache [" + e.url + "]", n),
            t.match(e, i).then(function(e) {
              if (e)
                return e;
              if (u)
                return u;
              throw r
            })
        });
        return l.push(h),
          Promise.race(l)
      })
  }
  var o = n(2),
    a = n(7);
  e.exports = r
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
    n = n || {};
    var r = n.cache || o.cache,
      i = r.queryOptions;
    return a.debug("Strategy: cache only [" + e.url + "]", n),
      a.openCache(n).then(function(t) {
        return t.match(e, i).then(function(e) {
          var t = Date.now();
          if (a.isResponseFresh(e, r.maxAgeSeconds, t))
            return e
        })
      })
  }
  var o = n(2),
    a = n(7);
  e.exports = r
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
    n = n || {};
    var r = n.cache || o.cache,
      i = r.queryOptions;
    return a.debug("Strategy: cache first [" + e.url + "]", n),
      a.openCache(n).then(function(t) {
        return t.match(e, i).then(function(t) {
          var o = Date.now();
          return a.isResponseFresh(t, r.maxAgeSeconds, o) ? t : a.fetchAndCache(e, n)
        })
      })
  }
  var o = n(2),
    a = n(7);
  e.exports = r
}, function(e, t, n) {
  "use strict";

  function r(e, t, n) {
    return o.debug("Strategy: fastest [" + e.url + "]", n),
      new Promise(function(r, i) {
        var c = !1,
          s = [],
          u = function(e) {
            s.push("" + e),
              c ? i(Error('Both cache and network failed: "' + s.join('", "') + '"')) : c = !0
          },
          l = function(e) {
            e instanceof Response ? r(e) : u("No result returned")
          };
        o.fetchAndCache(e.clone(), n).then(l, u),
          a(e, t, n).then(l, u)
      })
  }
  var o = n(7),
    a = n(12);
  e.exports = r
}, function(e, t, n) {
  "use strict";

  function r(e) {
    var t = s.match(e.request);
    t ? e.respondWith(t(e.request)) : s.default && "GET" === e.request.method && 0 === e.request.url.indexOf("http") && e.respondWith(s.default(e.request))
  }

  function o(e) {
    c.debug("activate event fired");
    var t = u.cache.name + "$$$inactive$$$";
    e.waitUntil(c.renameCache(t, u.cache.name))
  }

  function a(e) {
    return e.reduce(function(e, t) {
      return e.concat(t)
    }, [])
  }

  function i(e) {
    var t = u.cache.name + "$$$inactive$$$";
    c.debug("install event fired"),
      c.debug("creating cache [" + t + "]"),
      e.waitUntil(c.openCache({
        cache: {
          name: t
        }
      }).then(function(e) {
        return Promise.all(u.preCacheItems).then(a).then(c.validatePrecacheInput).then(function(t) {
          return c.debug("preCache list: " + (t.join(", ") || "(none)")),
            e.addAll(t)
        })
      }))
  }
  n(16);
  var c = n(7),
    s = n(3),
    u = n(2);
  e.exports = {
    fetchListener: r,
    activateListener: o,
    installListener: i
  }
}, function(e, t) {
  ! function() {
    var e = Cache.prototype.addAll,
      t = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
    if (t)
      var n = t[1],
        r = parseInt(t[2]);
    e && (!t || "Firefox" === n && r >= 46 || "Chrome" === n && r >= 50) || (Cache.prototype.addAll = function(e) {
        function t(e) {
          this.name = "NetworkError",
            this.code = 19,
            this.message = e
        }
        var n = this;
        return t.prototype = Object.create(Error.prototype),
          Promise.resolve().then(function() {
            if (1 > arguments.length)
              throw new TypeError;
            return e = e.map(function(e) {
                return e instanceof Request ? e : e + ""
              }),
              Promise.all(e.map(function(e) {
                "string" == typeof e && (e = new Request(e));
                var n = new URL(e.url).protocol;
                if ("http:" !== n && "https:" !== n)
                  throw new t("Invalid scheme");
                return fetch(e.clone())
              }))
          }).then(function(r) {
            if (r.some(function(e) {
                return !e.ok
              }))
              throw new t("Incorrect response status");
            return Promise.all(r.map(function(t, r) {
              return n.put(e[r], t)
            }))
          }).then(function() {})
      },
      Cache.prototype.add = function(e) {
        return this.addAll([e])
      }
    )
  }()
}, function(e, t) {
  "use strict";

  function n(e, t, n) {
    if (t && t.deviceId && t.messageId && t.contextId) {
      var r = {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "CcLgB6MRrQJCcJGxmZTB2XsPSJiZS8Aicbt2k9m4or77b2y4"
          },
          protocol: "https",
          hostname: "connekt.flipkart.net/v1",
          pathname: "push/callback/openweb/fklite/" + t.deviceId
        },
        o = {
          type: "PN",
          eventType: e,
          timestamp: (new Date).getTime(),
          messageId: t.messageId,
          contextId: t.contextId,
          cargo: n
        },
        a = {};
      return a.ajaxConfig = r,
        fetch(r.protocol + "://" + r.hostname + "/" + r.pathname, {
          method: "post",
          headers: r.headers,
          body: JSON.stringify(o)
        })
    }
    return null
  }
  t.__esModule = !0,
    t.default = n,
    e.exports = t.default
}, function(e, t, n) {
  var r, o;
  ! function() {
    "use strict";

    function n() {
      return i || (i = new Promise(function(e, t) {
          var n = indexedDB.open("keyval-store", 1);
          n.onerror = function() {
              t(n.error)
            },
            n.onupgradeneeded = function() {
              n.result.createObjectStore("keyval")
            },
            n.onsuccess = function() {
              e(n.result)
            }
        })),
        i
    }

    function a(e, t) {
      return n().then(function(n) {
        return new Promise(function(r, o) {
          var a = n.transaction("keyval", e);
          a.oncomplete = function() {
              r()
            },
            a.onerror = function() {
              o(a.error)
            },
            t(a.objectStore("keyval"))
        })
      })
    }
    var i, c = {
      get: function(e) {
        var t;
        return a("readonly", function(n) {
          t = n.get(e)
        }).then(function() {
          return t.result
        })
      },
      set: function(e, t) {
        return a("readwrite", function(n) {
          n.put(t, e)
        })
      },
      delete: function(e) {
        return a("readwrite", function(t) {
          t.delete(e)
        })
      },
      clear: function() {
        return a("readwrite", function(e) {
          e.clear()
        })
      },
      keys: function() {
        var e = [];
        return a("readonly", function(t) {
          (t.openKeyCursor || t.openCursor).call(t).onsuccess = function() {
            this.result && (e.push(this.result.key),
              this.result.continue())
          }
        }).then(function() {
          return e
        })
      }
    };
    void 0 !== e && e.exports ? e.exports = c : (r = [],
      o = function() {
        return c
      }
      .apply(t, r), !(void 0 !== o && (e.exports = o)))
  }()
}]);