! function(t) {
  function e(r) {
    if (n[r])
      return n[r].exports;
    var o = n[r] = {
      exports: {},
      id: r,
      loaded: !1
    };
    return t[r].call(o.exports, o, o.exports, e),
      o.loaded = !0,
      o.exports
  }
  var n = {};
  return e.m = t,
    e.c = n,
    e.p = "https://ma-0.twimg.com/twitter-assets/responsive-web/serviceworker/",
    e(0)
}([function(t, e, n) {
  "use strict";
  n(1),
    n(3),
    n(127);
  var r = function(t) {
      t.waitUntil(self.skipWaiting())
    },
    o = function(t) {
      t.waitUntil(self.clients.claim())
    };
  self.addEventListener("install", r),
    self.addEventListener("activate", o)
}, function(t, e, n) {
  "use strict";
  n(2)
}, function(t, e) {
  ! function() {
    var t = Cache.prototype.addAll,
      e = navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);
    if (e)
      var n = e[1],
        r = parseInt(e[2]);
    t && (!e || "Firefox" === n && r >= 46 || "Chrome" === n && r >= 50) || (Cache.prototype.addAll = function(t) {
        function e(t) {
          this.name = "NetworkError",
            this.code = 19,
            this.message = t
        }
        var n = this;
        return e.prototype = Object.create(Error.prototype),
          Promise.resolve().then(function() {
            if (arguments.length < 1)
              throw new TypeError;
            return t = t.map(function(t) {
                return t instanceof Request ? t : String(t)
              }),
              Promise.all(t.map(function(t) {
                "string" == typeof t && (t = new Request(t));
                var n = new URL(t.url).protocol;
                if ("http:" !== n && "https:" !== n)
                  throw new e("Invalid scheme");
                return fetch(t.clone())
              }))
          }).then(function(r) {
            if (r.some(function(t) {
                return !t.ok
              }))
              throw new e("Incorrect response status");
            return Promise.all(r.map(function(e, r) {
              return n.put(t[r], e)
            }))
          }).then(function() {})
      },
      Cache.prototype.add = function(t) {
        return this.addAll([t])
      }
    )
  }()
}, function(t, e, n) {
  "use strict";
  n(4),
    n(83),
    n(125)
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.handleCleanupStaleAssets = e.handleCacheAssets = e.handleFetchAsset = void 0;
  var o = n(5),
    i = r(o),
    u = n(70),
    c = r(u),
    a = n(75),
    f = "assets",
    s = "development" === self.ENV,
    l = "/home?precache=1",
    d = void 0,
    p = [self.location.origin + "/", self.location.origin + "/compose", self.location.origin + "/home", self.location.origin + "/notifications", self.location.origin + "/login"],
    v = [new RegExp("^" + (0,
      a.regexEscapeString)(self.location.origin) + "/messages(/.+)?"), new RegExp("^" + (0,
      a.regexEscapeString)(self.location.origin) + "/search(.+)?"), new RegExp("^" + (0,
      a.regexEscapeString)(self.location.origin) + "/[a-zA-Z0-9_]{1,20}/status")],
    h = function(t) {
      if (p.indexOf(t) !== -1)
        return !0;
      for (var e = 0; e < v.length; e++) {
        var n = v[e];
        if (n.test(t))
          return !0
      }
      return !1
    },
    y = function() {
      return d || (d = new Request(l, {
          cache: "reload",
          mode: "same-origin",
          credentials: "include"
        })),
        d
    },
    _ = function(t) {
      return t.url.replace(self.location.origin, "")
    },
    m = e.handleFetchAsset = function(t) {
      var e = t.request,
        n = e.url,
        r = self.ASSETS.map(a.regexEscapeString).join("|"),
        o = new RegExp("(" + r + ")$");
      if (!s) {
        if (o.test(n))
          return void t.respondWith((0,
            a.cacheFirst)(f, e));
        if (n.indexOf(self.location.origin + "/?logout") === -1 && n.indexOf(self.location.origin + "/i/rweb/logout") === -1 && n.indexOf(self.location.origin + "/login") === -1 && n.indexOf(self.location.origin + "/signup") === -1 || t.waitUntil(caches.open(f).then(function(t) {
            return t.delete(d)
          }).catch(function() {})),
          h(n)) {
          var i = (0,
            a.requestWithUrl)(e, (0,
            a.urlWithParam)(e.url, "prefetchTimestamp", Date.now()));
          t.respondWith((0,
            a.networkPriorityFirst)(f, i, y()))
        }
      }
    },
    g = e.handleCacheAssets = function(t) {
      t.waitUntil(caches.open(f).then(function(t) {
        return t.keys().then(function(e) {
          var n = e.map(_),
            r = self.ASSETS.filter(function(t) {
              return n.indexOf(t) === -1
            });
          return t.addAll([y()].concat((0,
            c.default)(r)))
        })
      }))
    },
    w = e.handleCleanupStaleAssets = function(t) {
      t.waitUntil(caches.open(f).then(function(t) {
        return t.keys().then(function(e) {
          var n = e.map(_),
            r = [l].concat((0,
              c.default)(self.ASSETS)),
            o = n.filter(function(t) {
              return r.indexOf(t) === -1
            });
          return i.default.all(o.map(function(e) {
            return t.delete(e)
          }))
        })
      }))
    };
  self.addEventListener("fetch", m),
    self.addEventListener("install", g),
    self.addEventListener("activate", w)
}, function(t, e, n) {
  t.exports = {
    default: n(6),
    __esModule: !0
  }
}, function(t, e, n) {
  n(7),
    n(8),
    n(52),
    n(56),
    t.exports = n(16).Promise
}, function(t, e) {}, function(t, e, n) {
  "use strict";
  var r = n(9)(!0);
  n(12)(String, "String", function(t) {
    this._t = String(t),
      this._i = 0
  }, function() {
    var t, e = this._t,
      n = this._i;
    return n >= e.length ? {
      value: void 0,
      done: !0
    } : (t = r(e, n),
      this._i += t.length, {
        value: t,
        done: !1
      })
  })
}, function(t, e, n) {
  var r = n(10),
    o = n(11);
  t.exports = function(t) {
    return function(e, n) {
      var i, u, c = String(o(e)),
        a = r(n),
        f = c.length;
      return a < 0 || a >= f ? t ? "" : void 0 : (i = c.charCodeAt(a),
        i < 55296 || i > 56319 || a + 1 === f || (u = c.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? c.charAt(a) : i : t ? c.slice(a, a + 2) : (i - 55296 << 10) + (u - 56320) + 65536)
    }
  }
}, function(t, e) {
  var n = Math.ceil,
    r = Math.floor;
  t.exports = function(t) {
    return isNaN(t = +t) ? 0 : (t > 0 ? r : n)(t)
  }
}, function(t, e) {
  t.exports = function(t) {
    if (void 0 == t)
      throw TypeError("Can't call method on  " + t);
    return t
  }
}, function(t, e, n) {
  "use strict";
  var r = n(13),
    o = n(14),
    i = n(29),
    u = n(19),
    c = n(30),
    a = n(31),
    f = n(32),
    s = n(48),
    l = n(50),
    d = n(49)("iterator"),
    p = !([].keys && "next" in [].keys()),
    v = "@@iterator",
    h = "keys",
    y = "values",
    _ = function() {
      return this
    };
  t.exports = function(t, e, n, m, g, w, b) {
    f(n, e, m);
    var O, x, E, A = function(t) {
        if (!p && t in M)
          return M[t];
        switch (t) {
          case h:
            return function() {
              return new n(this, t)
            };
          case y:
            return function() {
              return new n(this, t)
            }
        }
        return function() {
          return new n(this, t)
        }
      },
      S = e + " Iterator",
      j = g == y,
      I = !1,
      M = t.prototype,
      N = M[d] || M[v] || g && M[g],
      T = N || A(g),
      P = g ? j ? A("entries") : T : void 0,
      k = "Array" == e ? M.entries || N : N;
    if (k && (E = l(k.call(new t)),
        E !== Object.prototype && (s(E, S, !0),
          r || c(E, d) || u(E, d, _))),
      j && N && N.name !== y && (I = !0,
        T = function() {
          return N.call(this)
        }
      ),
      r && !b || !p && !I && M[d] || u(M, d, T),
      a[e] = T,
      a[S] = _,
      g)
      if (O = {
          values: j ? T : A(y),
          keys: w ? T : A(h),
          entries: P
        },
        b)
        for (x in O)
          x in M || i(M, x, O[x]);
      else
        o(o.P + o.F * (p || I), e, O);
    return O
  }
}, function(t, e) {
  t.exports = !0
}, function(t, e, n) {
  var r = n(15),
    o = n(16),
    i = n(17),
    u = n(19),
    c = "prototype",
    a = function(t, e, n) {
      var f, s, l, d = t & a.F,
        p = t & a.G,
        v = t & a.S,
        h = t & a.P,
        y = t & a.B,
        _ = t & a.W,
        m = p ? o : o[e] || (o[e] = {}),
        g = m[c],
        w = p ? r : v ? r[e] : (r[e] || {})[c];
      p && (n = e);
      for (f in n)
        s = !d && w && void 0 !== w[f],
        s && f in m || (l = s ? w[f] : n[f],
          m[f] = p && "function" != typeof w[f] ? n[f] : y && s ? i(l, r) : _ && w[f] == l ? function(t) {
            var e = function(e, n, r) {
              if (this instanceof t) {
                switch (arguments.length) {
                  case 0:
                    return new t;
                  case 1:
                    return new t(e);
                  case 2:
                    return new t(e, n)
                }
                return new t(e, n, r)
              }
              return t.apply(this, arguments)
            };
            return e[c] = t[c],
              e
          }(l) : h && "function" == typeof l ? i(Function.call, l) : l,
          h && ((m.virtual || (m.virtual = {}))[f] = l,
            t & a.R && g && !g[f] && u(g, f, l)))
    };
  a.F = 1,
    a.G = 2,
    a.S = 4,
    a.P = 8,
    a.B = 16,
    a.W = 32,
    a.U = 64,
    a.R = 128,
    t.exports = a
}, function(t, e) {
  var n = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = n)
}, function(t, e) {
  var n = t.exports = {
    version: "2.4.0"
  };
  "number" == typeof __e && (__e = n)
}, function(t, e, n) {
  var r = n(18);
  t.exports = function(t, e, n) {
    if (r(t),
      void 0 === e)
      return t;
    switch (n) {
      case 1:
        return function(n) {
          return t.call(e, n)
        };
      case 2:
        return function(n, r) {
          return t.call(e, n, r)
        };
      case 3:
        return function(n, r, o) {
          return t.call(e, n, r, o)
        }
    }
    return function() {
      return t.apply(e, arguments)
    }
  }
}, function(t, e) {
  t.exports = function(t) {
    if ("function" != typeof t)
      throw TypeError(t + " is not a function!");
    return t
  }
}, function(t, e, n) {
  var r = n(20),
    o = n(28);
  t.exports = n(24) ? function(t, e, n) {
      return r.f(t, e, o(1, n))
    } :
    function(t, e, n) {
      return t[e] = n,
        t
    }
}, function(t, e, n) {
  var r = n(21),
    o = n(23),
    i = n(27),
    u = Object.defineProperty;
  e.f = n(24) ? Object.defineProperty : function(t, e, n) {
    if (r(t),
      e = i(e, !0),
      r(n),
      o)
      try {
        return u(t, e, n)
      } catch (t) {}
    if ("get" in n || "set" in n)
      throw TypeError("Accessors not supported!");
    return "value" in n && (t[e] = n.value),
      t
  }
}, function(t, e, n) {
  var r = n(22);
  t.exports = function(t) {
    if (!r(t))
      throw TypeError(t + " is not an object!");
    return t
  }
}, function(t, e) {
  t.exports = function(t) {
    return "object" == typeof t ? null !== t : "function" == typeof t
  }
}, function(t, e, n) {
  t.exports = !n(24) && !n(25)(function() {
    return 7 != Object.defineProperty(n(26)("div"), "a", {
      get: function() {
        return 7
      }
    }).a
  })
}, function(t, e, n) {
  t.exports = !n(25)(function() {
    return 7 != Object.defineProperty({}, "a", {
      get: function() {
        return 7
      }
    }).a
  })
}, function(t, e) {
  t.exports = function(t) {
    try {
      return !!t()
    } catch (t) {
      return !0
    }
  }
}, function(t, e, n) {
  var r = n(22),
    o = n(15).document,
    i = r(o) && r(o.createElement);
  t.exports = function(t) {
    return i ? o.createElement(t) : {}
  }
}, function(t, e, n) {
  var r = n(22);
  t.exports = function(t, e) {
    if (!r(t))
      return t;
    var n, o;
    if (e && "function" == typeof(n = t.toString) && !r(o = n.call(t)))
      return o;
    if ("function" == typeof(n = t.valueOf) && !r(o = n.call(t)))
      return o;
    if (!e && "function" == typeof(n = t.toString) && !r(o = n.call(t)))
      return o;
    throw TypeError("Can't convert object to primitive value")
  }
}, function(t, e) {
  t.exports = function(t, e) {
    return {
      enumerable: !(1 & t),
      configurable: !(2 & t),
      writable: !(4 & t),
      value: e
    }
  }
}, function(t, e, n) {
  t.exports = n(19)
}, function(t, e) {
  var n = {}.hasOwnProperty;
  t.exports = function(t, e) {
    return n.call(t, e)
  }
}, function(t, e) {
  t.exports = {}
}, function(t, e, n) {
  "use strict";
  var r = n(33),
    o = n(28),
    i = n(48),
    u = {};
  n(19)(u, n(49)("iterator"), function() {
      return this
    }),
    t.exports = function(t, e, n) {
      t.prototype = r(u, {
          next: o(1, n)
        }),
        i(t, e + " Iterator")
    }
}, function(t, e, n) {
  var r = n(21),
    o = n(34),
    i = n(46),
    u = n(43)("IE_PROTO"),
    c = function() {},
    a = "prototype",
    f = function() {
      var t, e = n(26)("iframe"),
        r = i.length,
        o = "<",
        u = ">";
      for (e.style.display = "none",
        n(47).appendChild(e),
        e.src = "javascript:",
        t = e.contentWindow.document,
        t.open(),
        t.write(o + "script" + u + "document.F=Object" + o + "/script" + u),
        t.close(),
        f = t.F; r--;)
        delete f[a][i[r]];
      return f()
    };
  t.exports = Object.create || function(t, e) {
    var n;
    return null !== t ? (c[a] = r(t),
        n = new c,
        c[a] = null,
        n[u] = t) : n = f(),
      void 0 === e ? n : o(n, e)
  }
}, function(t, e, n) {
  var r = n(20),
    o = n(21),
    i = n(35);
  t.exports = n(24) ? Object.defineProperties : function(t, e) {
    o(t);
    for (var n, u = i(e), c = u.length, a = 0; c > a;)
      r.f(t, n = u[a++], e[n]);
    return t
  }
}, function(t, e, n) {
  var r = n(36),
    o = n(46);
  t.exports = Object.keys || function(t) {
    return r(t, o)
  }
}, function(t, e, n) {
  var r = n(30),
    o = n(37),
    i = n(40)(!1),
    u = n(43)("IE_PROTO");
  t.exports = function(t, e) {
    var n, c = o(t),
      a = 0,
      f = [];
    for (n in c)
      n != u && r(c, n) && f.push(n);
    for (; e.length > a;)
      r(c, n = e[a++]) && (~i(f, n) || f.push(n));
    return f
  }
}, function(t, e, n) {
  var r = n(38),
    o = n(11);
  t.exports = function(t) {
    return r(o(t))
  }
}, function(t, e, n) {
  var r = n(39);
  t.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t) {
    return "String" == r(t) ? t.split("") : Object(t)
  }
}, function(t, e) {
  var n = {}.toString;
  t.exports = function(t) {
    return n.call(t).slice(8, -1)
  }
}, function(t, e, n) {
  var r = n(37),
    o = n(41),
    i = n(42);
  t.exports = function(t) {
    return function(e, n, u) {
      var c, a = r(e),
        f = o(a.length),
        s = i(u, f);
      if (t && n != n) {
        for (; f > s;)
          if (c = a[s++],
            c != c)
            return !0
      } else
        for (; f > s; s++)
          if ((t || s in a) && a[s] === n)
            return t || s || 0;
      return !t && -1
    }
  }
}, function(t, e, n) {
  var r = n(10),
    o = Math.min;
  t.exports = function(t) {
    return t > 0 ? o(r(t), 9007199254740991) : 0
  }
}, function(t, e, n) {
  var r = n(10),
    o = Math.max,
    i = Math.min;
  t.exports = function(t, e) {
    return t = r(t),
      t < 0 ? o(t + e, 0) : i(t, e)
  }
}, function(t, e, n) {
  var r = n(44)("keys"),
    o = n(45);
  t.exports = function(t) {
    return r[t] || (r[t] = o(t))
  }
}, function(t, e, n) {
  var r = n(15),
    o = "__core-js_shared__",
    i = r[o] || (r[o] = {});
  t.exports = function(t) {
    return i[t] || (i[t] = {})
  }
}, function(t, e) {
  var n = 0,
    r = Math.random();
  t.exports = function(t) {
    return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++n + r).toString(36))
  }
}, function(t, e) {
  t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(t, e, n) {
  t.exports = n(15).document && document.documentElement
}, function(t, e, n) {
  var r = n(20).f,
    o = n(30),
    i = n(49)("toStringTag");
  t.exports = function(t, e, n) {
    t && !o(t = n ? t : t.prototype, i) && r(t, i, {
      configurable: !0,
      value: e
    })
  }
}, function(t, e, n) {
  var r = n(44)("wks"),
    o = n(45),
    i = n(15).Symbol,
    u = "function" == typeof i,
    c = t.exports = function(t) {
      return r[t] || (r[t] = u && i[t] || (u ? i : o)("Symbol." + t))
    };
  c.store = r
}, function(t, e, n) {
  var r = n(30),
    o = n(51),
    i = n(43)("IE_PROTO"),
    u = Object.prototype;
  t.exports = Object.getPrototypeOf || function(t) {
    return t = o(t),
      r(t, i) ? t[i] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null
  }
}, function(t, e, n) {
  var r = n(11);
  t.exports = function(t) {
    return Object(r(t))
  }
}, function(t, e, n) {
  n(53);
  for (var r = n(15), o = n(19), i = n(31), u = n(49)("toStringTag"), c = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], a = 0; a < 5; a++) {
    var f = c[a],
      s = r[f],
      l = s && s.prototype;
    l && !l[u] && o(l, u, f),
      i[f] = i.Array
  }
}, function(t, e, n) {
  "use strict";
  var r = n(54),
    o = n(55),
    i = n(31),
    u = n(37);
  t.exports = n(12)(Array, "Array", function(t, e) {
      this._t = u(t),
        this._i = 0,
        this._k = e
    }, function() {
      var t = this._t,
        e = this._k,
        n = this._i++;
      return !t || n >= t.length ? (this._t = void 0,
        o(1)) : "keys" == e ? o(0, n) : "values" == e ? o(0, t[n]) : o(0, [n, t[n]])
    }, "values"),
    i.Arguments = i.Array,
    r("keys"),
    r("values"),
    r("entries")
}, function(t, e) {
  t.exports = function() {}
}, function(t, e) {
  t.exports = function(t, e) {
    return {
      value: e,
      done: !!t
    }
  }
}, function(t, e, n) {
  "use strict";
  var r, o, i, u = n(13),
    c = n(15),
    a = n(17),
    f = n(57),
    s = n(14),
    l = n(22),
    d = n(18),
    p = n(58),
    v = n(59),
    h = n(63),
    y = n(64).set,
    _ = n(66)(),
    m = "Promise",
    g = c.TypeError,
    w = c.process,
    b = c[m],
    w = c.process,
    O = "process" == f(w),
    x = function() {},
    E = !! function() {
      try {
        var t = b.resolve(1),
          e = (t.constructor = {})[n(49)("species")] = function(t) {
            t(x, x)
          };
        return (O || "function" == typeof PromiseRejectionEvent) && t.then(x) instanceof e
      } catch (t) {}
    }(),
    A = function(t, e) {
      return t === e || t === b && e === i
    },
    S = function(t) {
      var e;
      return !(!l(t) || "function" != typeof(e = t.then)) && e
    },
    j = function(t) {
      return A(b, t) ? new I(t) : new o(t)
    },
    I = o = function(t) {
      var e, n;
      this.promise = new t(function(t, r) {
          if (void 0 !== e || void 0 !== n)
            throw g("Bad Promise constructor");
          e = t,
            n = r
        }),
        this.resolve = d(e),
        this.reject = d(n)
    },
    M = function(t) {
      try {
        t()
      } catch (t) {
        return {
          error: t
        }
      }
    },
    N = function(t, e) {
      if (!t._n) {
        t._n = !0;
        var n = t._c;
        _(function() {
          for (var r = t._v, o = 1 == t._s, i = 0, u = function(e) {
              var n, i, u = o ? e.ok : e.fail,
                c = e.resolve,
                a = e.reject,
                f = e.domain;
              try {
                u ? (o || (2 == t._h && k(t),
                    t._h = 1),
                  u === !0 ? n = r : (f && f.enter(),
                    n = u(r),
                    f && f.exit()),
                  n === e.promise ? a(g("Promise-chain cycle")) : (i = S(n)) ? i.call(n, c, a) : c(n)) : a(r)
              } catch (t) {
                a(t)
              }
            }; n.length > i;)
            u(n[i++]);
          t._c = [],
            t._n = !1,
            e && !t._h && T(t)
        })
      }
    },
    T = function(t) {
      y.call(c, function() {
        var e, n, r, o = t._v;
        if (P(t) && (e = M(function() {
              O ? w.emit("unhandledRejection", o, t) : (n = c.onunhandledrejection) ? n({
                promise: t,
                reason: o
              }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", o)
            }),
            t._h = O || P(t) ? 2 : 1),
          t._a = void 0,
          e)
          throw e.error
      })
    },
    P = function(t) {
      if (1 == t._h)
        return !1;
      for (var e, n = t._a || t._c, r = 0; n.length > r;)
        if (e = n[r++],
          e.fail || !P(e.promise))
          return !1;
      return !0
    },
    k = function(t) {
      y.call(c, function() {
        var e;
        O ? w.emit("rejectionHandled", t) : (e = c.onrejectionhandled) && e({
          promise: t,
          reason: t._v
        })
      })
    },
    C = function(t) {
      var e = this;
      e._d || (e._d = !0,
        e = e._w || e,
        e._v = t,
        e._s = 2,
        e._a || (e._a = e._c.slice()),
        N(e, !0))
    },
    D = function(t) {
      var e, n = this;
      if (!n._d) {
        n._d = !0,
          n = n._w || n;
        try {
          if (n === t)
            throw g("Promise can't be resolved itself");
          (e = S(t)) ? _(function() {
            var r = {
              _w: n,
              _d: !1
            };
            try {
              e.call(t, a(D, r, 1), a(C, r, 1))
            } catch (t) {
              C.call(r, t)
            }
          }): (n._v = t,
            n._s = 1,
            N(n, !1))
        } catch (t) {
          C.call({
            _w: n,
            _d: !1
          }, t)
        }
      }
    };
  E || (b = function(t) {
        p(this, b, m, "_h"),
          d(t),
          r.call(this);
        try {
          t(a(D, this, 1), a(C, this, 1))
        } catch (t) {
          C.call(this, t)
        }
      },
      r = function(t) {
        this._c = [],
          this._a = void 0,
          this._s = 0,
          this._d = !1,
          this._v = void 0,
          this._h = 0,
          this._n = !1
      },
      r.prototype = n(67)(b.prototype, {
        then: function(t, e) {
          var n = j(h(this, b));
          return n.ok = "function" != typeof t || t,
            n.fail = "function" == typeof e && e,
            n.domain = O ? w.domain : void 0,
            this._c.push(n),
            this._a && this._a.push(n),
            this._s && N(this, !1),
            n.promise
        },
        catch: function(t) {
          return this.then(void 0, t)
        }
      }),
      I = function() {
        var t = new r;
        this.promise = t,
          this.resolve = a(D, t, 1),
          this.reject = a(C, t, 1)
      }
    ),
    s(s.G + s.W + s.F * !E, {
      Promise: b
    }),
    n(48)(b, m),
    n(68)(m),
    i = n(16)[m],
    s(s.S + s.F * !E, m, {
      reject: function(t) {
        var e = j(this),
          n = e.reject;
        return n(t),
          e.promise
      }
    }),
    s(s.S + s.F * (u || !E), m, {
      resolve: function(t) {
        if (t instanceof b && A(t.constructor, this))
          return t;
        var e = j(this),
          n = e.resolve;
        return n(t),
          e.promise
      }
    }),
    s(s.S + s.F * !(E && n(69)(function(t) {
      b.all(t).catch(x)
    })), m, {
      all: function(t) {
        var e = this,
          n = j(e),
          r = n.resolve,
          o = n.reject,
          i = M(function() {
            var n = [],
              i = 0,
              u = 1;
            v(t, !1, function(t) {
                var c = i++,
                  a = !1;
                n.push(void 0),
                  u++,
                  e.resolve(t).then(function(t) {
                    a || (a = !0,
                      n[c] = t,
                      --u || r(n))
                  }, o)
              }),
              --u || r(n)
          });
        return i && o(i.error),
          n.promise
      },
      race: function(t) {
        var e = this,
          n = j(e),
          r = n.reject,
          o = M(function() {
            v(t, !1, function(t) {
              e.resolve(t).then(n.resolve, r)
            })
          });
        return o && r(o.error),
          n.promise
      }
    })
}, function(t, e, n) {
  var r = n(39),
    o = n(49)("toStringTag"),
    i = "Arguments" == r(function() {
      return arguments
    }()),
    u = function(t, e) {
      try {
        return t[e]
      } catch (t) {}
    };
  t.exports = function(t) {
    var e, n, c;
    return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(n = u(e = Object(t), o)) ? n : i ? r(e) : "Object" == (c = r(e)) && "function" == typeof e.callee ? "Arguments" : c
  }
}, function(t, e) {
  t.exports = function(t, e, n, r) {
    if (!(t instanceof e) || void 0 !== r && r in t)
      throw TypeError(n + ": incorrect invocation!");
    return t
  }
}, function(t, e, n) {
  var r = n(17),
    o = n(60),
    i = n(61),
    u = n(21),
    c = n(41),
    a = n(62),
    f = {},
    s = {},
    e = t.exports = function(t, e, n, l, d) {
      var p, v, h, y, _ = d ? function() {
          return t
        } :
        a(t),
        m = r(n, l, e ? 2 : 1),
        g = 0;
      if ("function" != typeof _)
        throw TypeError(t + " is not iterable!");
      if (i(_)) {
        for (p = c(t.length); p > g; g++)
          if (y = e ? m(u(v = t[g])[0], v[1]) : m(t[g]),
            y === f || y === s)
            return y
      } else
        for (h = _.call(t); !(v = h.next()).done;)
          if (y = o(h, m, v.value, e),
            y === f || y === s)
            return y
    };
  e.BREAK = f,
    e.RETURN = s
}, function(t, e, n) {
  var r = n(21);
  t.exports = function(t, e, n, o) {
    try {
      return o ? e(r(n)[0], n[1]) : e(n)
    } catch (e) {
      var i = t.return;
      throw void 0 !== i && r(i.call(t)),
        e
    }
  }
}, function(t, e, n) {
  var r = n(31),
    o = n(49)("iterator"),
    i = Array.prototype;
  t.exports = function(t) {
    return void 0 !== t && (r.Array === t || i[o] === t)
  }
}, function(t, e, n) {
  var r = n(57),
    o = n(49)("iterator"),
    i = n(31);
  t.exports = n(16).getIteratorMethod = function(t) {
    if (void 0 != t)
      return t[o] || t["@@iterator"] || i[r(t)]
  }
}, function(t, e, n) {
  var r = n(21),
    o = n(18),
    i = n(49)("species");
  t.exports = function(t, e) {
    var n, u = r(t).constructor;
    return void 0 === u || void 0 == (n = r(u)[i]) ? e : o(n)
  }
}, function(t, e, n) {
  var r, o, i, u = n(17),
    c = n(65),
    a = n(47),
    f = n(26),
    s = n(15),
    l = s.process,
    d = s.setImmediate,
    p = s.clearImmediate,
    v = s.MessageChannel,
    h = 0,
    y = {},
    _ = "onreadystatechange",
    m = function() {
      var t = +this;
      if (y.hasOwnProperty(t)) {
        var e = y[t];
        delete y[t],
          e()
      }
    },
    g = function(t) {
      m.call(t.data)
    };
  d && p || (d = function(t) {
        for (var e = [], n = 1; arguments.length > n;)
          e.push(arguments[n++]);
        return y[++h] = function() {
            c("function" == typeof t ? t : Function(t), e)
          },
          r(h),
          h
      },
      p = function(t) {
        delete y[t]
      },
      "process" == n(39)(l) ? r = function(t) {
        l.nextTick(u(m, t, 1))
      } :
      v ? (o = new v,
        i = o.port2,
        o.port1.onmessage = g,
        r = u(i.postMessage, i, 1)) : s.addEventListener && "function" == typeof postMessage && !s.importScripts ? (r = function(t) {
          s.postMessage(t + "", "*")
        },
        s.addEventListener("message", g, !1)) : r = _ in f("script") ? function(t) {
        a.appendChild(f("script"))[_] = function() {
          a.removeChild(this),
            m.call(t)
        }
      } :
      function(t) {
        setTimeout(u(m, t, 1), 0)
      }
    ),
    t.exports = {
      set: d,
      clear: p
    }
}, function(t, e) {
  t.exports = function(t, e, n) {
    var r = void 0 === n;
    switch (e.length) {
      case 0:
        return r ? t() : t.call(n);
      case 1:
        return r ? t(e[0]) : t.call(n, e[0]);
      case 2:
        return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
      case 3:
        return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
      case 4:
        return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3])
    }
    return t.apply(n, e)
  }
}, function(t, e, n) {
  var r = n(15),
    o = n(64).set,
    i = r.MutationObserver || r.WebKitMutationObserver,
    u = r.process,
    c = r.Promise,
    a = "process" == n(39)(u);
  t.exports = function() {
    var t, e, n, f = function() {
      var r, o;
      for (a && (r = u.domain) && r.exit(); t;) {
        o = t.fn,
          t = t.next;
        try {
          o()
        } catch (r) {
          throw t ? n() : e = void 0,
            r
        }
      }
      e = void 0,
        r && r.enter()
    };
    if (a)
      n = function() {
        u.nextTick(f)
      };
    else if (i) {
      var s = !0,
        l = document.createTextNode("");
      new i(f).observe(l, {
          characterData: !0
        }),
        n = function() {
          l.data = s = !s
        }
    } else if (c && c.resolve) {
      var d = c.resolve();
      n = function() {
        d.then(f)
      }
    } else
      n = function() {
        o.call(r, f)
      };
    return function(r) {
      var o = {
        fn: r,
        next: void 0
      };
      e && (e.next = o),
        t || (t = o,
          n()),
        e = o
    }
  }
}, function(t, e, n) {
  var r = n(19);
  t.exports = function(t, e, n) {
    for (var o in e)
      n && t[o] ? t[o] = e[o] : r(t, o, e[o]);
    return t
  }
}, function(t, e, n) {
  "use strict";
  var r = n(15),
    o = n(16),
    i = n(20),
    u = n(24),
    c = n(49)("species");
  t.exports = function(t) {
    var e = "function" == typeof o[t] ? o[t] : r[t];
    u && e && !e[c] && i.f(e, c, {
      configurable: !0,
      get: function() {
        return this
      }
    })
  }
}, function(t, e, n) {
  var r = n(49)("iterator"),
    o = !1;
  try {
    var i = [7][r]();
    i.return = function() {
        o = !0
      },
      Array.from(i, function() {
        throw 2
      })
  } catch (t) {}
  t.exports = function(t, e) {
    if (!e && !o)
      return !1;
    var n = !1;
    try {
      var i = [7],
        u = i[r]();
      u.next = function() {
          return {
            done: n = !0
          }
        },
        i[r] = function() {
          return u
        },
        t(i)
    } catch (t) {}
    return n
  }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  e.__esModule = !0;
  var o = n(71),
    i = r(o);
  e.default = function(t) {
    if (Array.isArray(t)) {
      for (var e = 0, n = Array(t.length); e < t.length; e++)
        n[e] = t[e];
      return n
    }
    return (0,
      i.default)(t)
  }
}, function(t, e, n) {
  t.exports = {
    default: n(72),
    __esModule: !0
  }
}, function(t, e, n) {
  n(8),
    n(73),
    t.exports = n(16).Array.from
}, function(t, e, n) {
  "use strict";
  var r = n(17),
    o = n(14),
    i = n(51),
    u = n(60),
    c = n(61),
    a = n(41),
    f = n(74),
    s = n(62);
  o(o.S + o.F * !n(69)(function(t) {
    Array.from(t)
  }), "Array", {
    from: function(t) {
      var e, n, o, l, d = i(t),
        p = "function" == typeof this ? this : Array,
        v = arguments.length,
        h = v > 1 ? arguments[1] : void 0,
        y = void 0 !== h,
        _ = 0,
        m = s(d);
      if (y && (h = r(h, v > 2 ? arguments[2] : void 0, 2)),
        void 0 == m || p == Array && c(m))
        for (e = a(d.length),
          n = new p(e); e > _; _++)
          f(n, _, y ? h(d[_], _) : d[_]);
      else
        for (l = m.call(d),
          n = new p; !(o = l.next()).done; _++)
          f(n, _, y ? u(l, h, [o.value, _], !0) : o.value);
      return n.length = _,
        n
    }
  })
}, function(t, e, n) {
  "use strict";
  var r = n(20),
    o = n(28);
  t.exports = function(t, e, n) {
    e in t ? r.f(t, e, o(0, n)) : t[e] = n
  }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.isOnline = e.networkPriorityFirst = e.requestWithUrl = e.urlWithParam = e.networkFirst = e.cacheFirst = e.regexEscapeString = void 0;
  var o = n(76),
    i = r(o),
    u = n(5),
    c = r(u),
    a = 36e5,
    f = 24 * a,
    s = 24 * a * 3,
    l = 50,
    d = 500,
    p = 5e3,
    v = (e.regexEscapeString = function(t) {
        return t.replace(/[:\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      },
      function(t, e) {
        return caches.open(t).then(function(t) {
          return t.match(e.url).then(function(t) {
            return t ? t : c.default.reject()
          })
        })
      }
    ),
    h = (e.cacheFirst = function(t, e, n) {
        var r = n || e;
        return v(t, e).catch(function() {
          return fetch(r)
        })
      },
      e.networkFirst = function(t, e, n) {
        var r = n || e;
        return fetch(e).catch(function() {
          return v(t, r)
        })
      },
      function(t, e) {
        var n = t.headers.get("date"),
          r = p,
          o = Date.now() - e;
        if (n) {
          var i = new Date(n),
            u = e - i;
          u < f ? r = l : u < s && (r = d)
        }
        return Math.max(r - o, 1)
      }
    );
  e.urlWithParam = function(t, e, n) {
      var r = t.indexOf("?") !== -1,
        o = r ? "&" : "?";
      return "" + t + o + e + "=" + n
    },
    e.requestWithUrl = function(t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return new Request(e, (0,
        i.default)({
        body: t.clone().body,
        method: t.method,
        headers: t.headers,
        mode: "same-origin",
        credentials: t.credentials,
        cache: t.cache,
        redirect: t.redirect,
        referrer: t.referrer,
        integrity: t.integrity
      }, n))
    },
    e.networkPriorityFirst = function(t, e, n) {
      var r = n || e;
      return new c.default(function(n, o) {
        var i = Date.now(),
          u = !1,
          c = void 0,
          a = function(t) {
            u ? o(t) : u = !0
          };
        fetch(e).then(function(e) {
            c && clearTimeout(c),
              caches.open(t).then(function(t) {
                return t.put(r, e.clone())
              }),
              n(e.clone())
          }).catch(a),
          v(t, r).then(function(t) {
            var e = h(t, i);
            c = setTimeout(function() {
              c = void 0,
                n(t)
            }, e)
          }).catch(a)
      })
    },
    e.isOnline = function() {
      return self.navigator.onLine
    }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  e.__esModule = !0;
  var o = n(77),
    i = r(o);
  e.default = i.default || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
    }
    return t
  }
}, function(t, e, n) {
  t.exports = {
    default: n(78),
    __esModule: !0
  }
}, function(t, e, n) {
  n(79),
    t.exports = n(16).Object.assign
}, function(t, e, n) {
  var r = n(14);
  r(r.S + r.F, "Object", {
    assign: n(80)
  })
}, function(t, e, n) {
  "use strict";
  var r = n(35),
    o = n(81),
    i = n(82),
    u = n(51),
    c = n(38),
    a = Object.assign;
  t.exports = !a || n(25)(function() {
      var t = {},
        e = {},
        n = Symbol(),
        r = "abcdefghijklmnopqrst";
      return t[n] = 7,
        r.split("").forEach(function(t) {
          e[t] = t
        }),
        7 != a({}, t)[n] || Object.keys(a({}, e)).join("") != r
    }) ? function(t, e) {
      for (var n = u(t), a = arguments.length, f = 1, s = o.f, l = i.f; a > f;)
        for (var d, p = c(arguments[f++]), v = s ? r(p).concat(s(p)) : r(p), h = v.length, y = 0; h > y;)
          l.call(p, d = v[y++]) && (n[d] = p[d]);
      return n
    } :
    a
}, function(t, e) {
  e.f = Object.getOwnPropertySymbols
}, function(t, e) {
  e.f = {}.propertyIsEnumerable
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.handleActivate = e.handleFetch = void 0;
  var o = n(84),
    i = r(o),
    u = n(86),
    c = r(u),
    a = n(103),
    f = r(a),
    s = n(107),
    l = r(s),
    d = n(111),
    p = r(d),
    v = n(5),
    h = r(v),
    y = n(114),
    _ = r(y),
    m = n(75),
    g = "sync",
    w = "queue",
    b = 1,
    O = !1,
    x = void 0,
    E = ["/1.1/account/update_profile_image.json", "/1.1/dm/new.json", "/1.1/guest/activate.json", "/1.1/device/register_complete.json", "/1.1/mobile/settings/get.json", "/1.1/mutes/keywords/create.json", "/1.1/mutes/keywords/destroy.json", "/1.1/mutes/keywords/update.json", "/1.1/statuses/update.json", "/1.1/account/settings.json", "upload.twitter.com/i/media/upload.json"],
    A = function() {
      return x || (x = new _.default(g, w, b)),
        x
    },
    S = function(t, e) {
      return ["GET", "HEAD"].indexOf(t) === -1 && !E.some(function(t) {
        return e.indexOf(t) !== -1
      })
    },
    j = function(t) {
      var e = t.cache,
        n = t.credentials,
        r = t.headers,
        o = t.method,
        i = t.mode,
        u = t.redirect,
        c = t.referrer,
        a = t.url,
        f = {},
        s = !0,
        d = !1,
        v = void 0;
      try {
        for (var y, _ = (0,
            p.default)(r.entries()); !(s = (y = _.next()).done); s = !0) {
          var m = (0,
              l.default)(y.value, 2),
            g = m[0],
            w = m[1];
          f[g] = w
        }
      } catch (t) {
        d = !0,
          v = t
      } finally {
        try {
          !s && _.return && _.return()
        } finally {
          if (d)
            throw v
        }
      }
      var b = {
        url: a,
        headers: f,
        method: o,
        mode: i,
        credentials: n,
        cache: e,
        redirect: u,
        referrer: c
      };
      return S(o, a) ? t.clone().blob().then(function(t) {
        return b.body = t,
          h.default.resolve(b)
      }) : h.default.resolve(b)
    },
    I = function(t) {
      return h.default.resolve(new Request(t.url, t))
    },
    M = function(t) {
      return j(t).then(function(t) {
        return A().set(Date.now().toString(), t)
      })
    },
    N = function() {
      if (O)
        return h.default.resolve();
      var t = function() {
        O = !0;
        var t = {};
        return {
          v: A().iterate(function(e, n) {
            t[n] = e
          }).then(function() {
            return h.default.all((0,
              f.default)(t).map(function(t) {
              var e = (0,
                  l.default)(t, 2),
                n = e[0],
                r = e[1];
              return I(r).then(fetch).then(function() {
                return x.delete(n)
              })
            }))
          }).then(function() {
            O = !1
          }).catch(function() {
            O = !1
          })
        }
      }();
      return "object" === ("undefined" == typeof t ? "undefined" : (0,
        c.default)(t)) ? t.v : void 0
    },
    T = e.handleFetch = function(t) {
      (0,
        m.isOnline)() && t.waitUntil(N()),
        S(t.request.method, t.request.url) && t.respondWith(fetch(t.request.clone()).catch(function() {
          return M(t.request.clone()).then(function() {
            var t = new Blob([(0,
              i.default)({
              success: !0
            })], {
              type: "application/json"
            });
            return h.default.resolve(new Response(t, {
              status: 202,
              statusText: "CachedForSync"
            }))
          })
        }))
    },
    P = e.handleActivate = function(t) {
      t.waitUntil(A().clear())
    };
  self.addEventListener("fetch", T),
    self.addEventListener("activate", P)
}, function(t, e, n) {
  t.exports = {
    default: n(85),
    __esModule: !0
  }
}, function(t, e, n) {
  var r = n(16),
    o = r.JSON || (r.JSON = {
      stringify: JSON.stringify
    });
  t.exports = function(t) {
    return o.stringify.apply(o, arguments)
  }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  e.__esModule = !0;
  var o = n(87),
    i = r(o),
    u = n(90),
    c = r(u),
    a = "function" == typeof c.default && "symbol" == typeof i.default ? function(t) {
      return typeof t
    } :
    function(t) {
      return t && "function" == typeof c.default && t.constructor === c.default ? "symbol" : typeof t
    };
  e.default = "function" == typeof c.default && "symbol" === a(i.default) ? function(t) {
      return "undefined" == typeof t ? "undefined" : a(t)
    } :
    function(t) {
      return t && "function" == typeof c.default && t.constructor === c.default ? "symbol" : "undefined" == typeof t ? "undefined" : a(t)
    }
}, function(t, e, n) {
  t.exports = {
    default: n(88),
    __esModule: !0
  }
}, function(t, e, n) {
  n(8),
    n(52),
    t.exports = n(89).f("iterator")
}, function(t, e, n) {
  e.f = n(49)
}, function(t, e, n) {
  t.exports = {
    default: n(91),
    __esModule: !0
  }
}, function(t, e, n) {
  n(92),
    n(7),
    n(101),
    n(102),
    t.exports = n(16).Symbol
}, function(t, e, n) {
  "use strict";
  var r = n(15),
    o = n(30),
    i = n(24),
    u = n(14),
    c = n(29),
    a = n(93).KEY,
    f = n(25),
    s = n(44),
    l = n(48),
    d = n(45),
    p = n(49),
    v = n(89),
    h = n(94),
    y = n(95),
    _ = n(96),
    m = n(97),
    g = n(21),
    w = n(37),
    b = n(27),
    O = n(28),
    x = n(33),
    E = n(98),
    A = n(100),
    S = n(20),
    j = n(35),
    I = A.f,
    M = S.f,
    N = E.f,
    T = r.Symbol,
    P = r.JSON,
    k = P && P.stringify,
    C = "prototype",
    D = p("_hidden"),
    F = p("toPrimitive"),
    R = {}.propertyIsEnumerable,
    U = s("symbol-registry"),
    L = s("symbols"),
    W = s("op-symbols"),
    B = Object[C],
    K = "function" == typeof T,
    q = r.QObject,
    G = !q || !q[C] || !q[C].findChild,
    V = i && f(function() {
      return 7 != x(M({}, "a", {
        get: function() {
          return M(this, "a", {
            value: 7
          }).a
        }
      })).a
    }) ? function(t, e, n) {
      var r = I(B, e);
      r && delete B[e],
        M(t, e, n),
        r && t !== B && M(B, e, r)
    } :
    M,
    J = function(t) {
      var e = L[t] = x(T[C]);
      return e._k = t,
        e
    },
    Y = K && "symbol" == typeof T.iterator ? function(t) {
      return "symbol" == typeof t
    } :
    function(t) {
      return t instanceof T
    },
    H = function(t, e, n) {
      return t === B && H(W, e, n),
        g(t),
        e = b(e, !0),
        g(n),
        o(L, e) ? (n.enumerable ? (o(t, D) && t[D][e] && (t[D][e] = !1),
            n = x(n, {
              enumerable: O(0, !1)
            })) : (o(t, D) || M(t, D, O(1, {})),
            t[D][e] = !0),
          V(t, e, n)) : M(t, e, n)
    },
    z = function(t, e) {
      g(t);
      for (var n, r = _(e = w(e)), o = 0, i = r.length; i > o;)
        H(t, n = r[o++], e[n]);
      return t
    },
    X = function(t, e) {
      return void 0 === e ? x(t) : z(x(t), e)
    },
    Z = function(t) {
      var e = R.call(this, t = b(t, !0));
      return !(this === B && o(L, t) && !o(W, t)) && (!(e || !o(this, t) || !o(L, t) || o(this, D) && this[D][t]) || e)
    },
    $ = function(t, e) {
      if (t = w(t),
        e = b(e, !0),
        t !== B || !o(L, e) || o(W, e)) {
        var n = I(t, e);
        return !n || !o(L, e) || o(t, D) && t[D][e] || (n.enumerable = !0),
          n
      }
    },
    Q = function(t) {
      for (var e, n = N(w(t)), r = [], i = 0; n.length > i;)
        o(L, e = n[i++]) || e == D || e == a || r.push(e);
      return r
    },
    tt = function(t) {
      for (var e, n = t === B, r = N(n ? W : w(t)), i = [], u = 0; r.length > u;)
        !o(L, e = r[u++]) || n && !o(B, e) || i.push(L[e]);
      return i
    };
  K || (T = function() {
        if (this instanceof T)
          throw TypeError("Symbol is not a constructor!");
        var t = d(arguments.length > 0 ? arguments[0] : void 0),
          e = function(n) {
            this === B && e.call(W, n),
              o(this, D) && o(this[D], t) && (this[D][t] = !1),
              V(this, t, O(1, n))
          };
        return i && G && V(B, t, {
            configurable: !0,
            set: e
          }),
          J(t)
      },
      c(T[C], "toString", function() {
        return this._k
      }),
      A.f = $,
      S.f = H,
      n(99).f = E.f = Q,
      n(82).f = Z,
      n(81).f = tt,
      i && !n(13) && c(B, "propertyIsEnumerable", Z, !0),
      v.f = function(t) {
        return J(p(t))
      }
    ),
    u(u.G + u.W + u.F * !K, {
      Symbol: T
    });
  for (var et = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), nt = 0; et.length > nt;)
    p(et[nt++]);
  for (var et = j(p.store), nt = 0; et.length > nt;)
    h(et[nt++]);
  u(u.S + u.F * !K, "Symbol", {
      for: function(t) {
        return o(U, t += "") ? U[t] : U[t] = T(t)
      },
      keyFor: function(t) {
        if (Y(t))
          return y(U, t);
        throw TypeError(t + " is not a symbol!")
      },
      useSetter: function() {
        G = !0
      },
      useSimple: function() {
        G = !1
      }
    }),
    u(u.S + u.F * !K, "Object", {
      create: X,
      defineProperty: H,
      defineProperties: z,
      getOwnPropertyDescriptor: $,
      getOwnPropertyNames: Q,
      getOwnPropertySymbols: tt
    }),
    P && u(u.S + u.F * (!K || f(function() {
      var t = T();
      return "[null]" != k([t]) || "{}" != k({
        a: t
      }) || "{}" != k(Object(t))
    })), "JSON", {
      stringify: function(t) {
        if (void 0 !== t && !Y(t)) {
          for (var e, n, r = [t], o = 1; arguments.length > o;)
            r.push(arguments[o++]);
          return e = r[1],
            "function" == typeof e && (n = e), !n && m(e) || (e = function(t, e) {
              if (n && (e = n.call(this, t, e)), !Y(e))
                return e
            }),
            r[1] = e,
            k.apply(P, r)
        }
      }
    }),
    T[C][F] || n(19)(T[C], F, T[C].valueOf),
    l(T, "Symbol"),
    l(Math, "Math", !0),
    l(r.JSON, "JSON", !0)
}, function(t, e, n) {
  var r = n(45)("meta"),
    o = n(22),
    i = n(30),
    u = n(20).f,
    c = 0,
    a = Object.isExtensible || function() {
      return !0
    },
    f = !n(25)(function() {
      return a(Object.preventExtensions({}))
    }),
    s = function(t) {
      u(t, r, {
        value: {
          i: "O" + ++c,
          w: {}
        }
      })
    },
    l = function(t, e) {
      if (!o(t))
        return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
      if (!i(t, r)) {
        if (!a(t))
          return "F";
        if (!e)
          return "E";
        s(t)
      }
      return t[r].i
    },
    d = function(t, e) {
      if (!i(t, r)) {
        if (!a(t))
          return !0;
        if (!e)
          return !1;
        s(t)
      }
      return t[r].w
    },
    p = function(t) {
      return f && v.NEED && a(t) && !i(t, r) && s(t),
        t
    },
    v = t.exports = {
      KEY: r,
      NEED: !1,
      fastKey: l,
      getWeak: d,
      onFreeze: p
    }
}, function(t, e, n) {
  var r = n(15),
    o = n(16),
    i = n(13),
    u = n(89),
    c = n(20).f;
  t.exports = function(t) {
    var e = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
    "_" == t.charAt(0) || t in e || c(e, t, {
      value: u.f(t)
    })
  }
}, function(t, e, n) {
  var r = n(35),
    o = n(37);
  t.exports = function(t, e) {
    for (var n, i = o(t), u = r(i), c = u.length, a = 0; c > a;)
      if (i[n = u[a++]] === e)
        return n
  }
}, function(t, e, n) {
  var r = n(35),
    o = n(81),
    i = n(82);
  t.exports = function(t) {
    var e = r(t),
      n = o.f;
    if (n)
      for (var u, c = n(t), a = i.f, f = 0; c.length > f;)
        a.call(t, u = c[f++]) && e.push(u);
    return e
  }
}, function(t, e, n) {
  var r = n(39);
  t.exports = Array.isArray || function(t) {
    return "Array" == r(t)
  }
}, function(t, e, n) {
  var r = n(37),
    o = n(99).f,
    i = {}.toString,
    u = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
    c = function(t) {
      try {
        return o(t)
      } catch (t) {
        return u.slice()
      }
    };
  t.exports.f = function(t) {
    return u && "[object Window]" == i.call(t) ? c(t) : o(r(t))
  }
}, function(t, e, n) {
  var r = n(36),
    o = n(46).concat("length", "prototype");
  e.f = Object.getOwnPropertyNames || function(t) {
    return r(t, o)
  }
}, function(t, e, n) {
  var r = n(82),
    o = n(28),
    i = n(37),
    u = n(27),
    c = n(30),
    a = n(23),
    f = Object.getOwnPropertyDescriptor;
  e.f = n(24) ? f : function(t, e) {
    if (t = i(t),
      e = u(e, !0),
      a)
      try {
        return f(t, e)
      } catch (t) {}
    if (c(t, e))
      return o(!r.f.call(t, e), t[e])
  }
}, function(t, e, n) {
  n(94)("asyncIterator")
}, function(t, e, n) {
  n(94)("observable")
}, function(t, e, n) {
  t.exports = {
    default: n(104),
    __esModule: !0
  }
}, function(t, e, n) {
  n(105),
    t.exports = n(16).Object.entries;
}, function(t, e, n) {
  var r = n(14),
    o = n(106)(!0);
  r(r.S, "Object", {
    entries: function(t) {
      return o(t)
    }
  })
}, function(t, e, n) {
  var r = n(35),
    o = n(37),
    i = n(82).f;
  t.exports = function(t) {
    return function(e) {
      for (var n, u = o(e), c = r(u), a = c.length, f = 0, s = []; a > f;)
        i.call(u, n = c[f++]) && s.push(t ? [n, u[n]] : u[n]);
      return s
    }
  }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  e.__esModule = !0;
  var o = n(108),
    i = r(o),
    u = n(111),
    c = r(u);
  e.default = function() {
    function t(t, e) {
      var n = [],
        r = !0,
        o = !1,
        i = void 0;
      try {
        for (var u, a = (0,
            c.default)(t); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0)
        ;
      } catch (t) {
        o = !0,
          i = t
      } finally {
        try {
          !r && a.return && a.return()
        } finally {
          if (o)
            throw i
        }
      }
      return n
    }
    return function(e, n) {
      if (Array.isArray(e))
        return e;
      if ((0,
          i.default)(Object(e)))
        return t(e, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
  }()
}, function(t, e, n) {
  t.exports = {
    default: n(109),
    __esModule: !0
  }
}, function(t, e, n) {
  n(52),
    n(8),
    t.exports = n(110)
}, function(t, e, n) {
  var r = n(57),
    o = n(49)("iterator"),
    i = n(31);
  t.exports = n(16).isIterable = function(t) {
    var e = Object(t);
    return void 0 !== e[o] || "@@iterator" in e || i.hasOwnProperty(r(e))
  }
}, function(t, e, n) {
  t.exports = {
    default: n(112),
    __esModule: !0
  }
}, function(t, e, n) {
  n(52),
    n(8),
    t.exports = n(113)
}, function(t, e, n) {
  var r = n(21),
    o = n(62);
  t.exports = n(16).getIterator = function(t) {
    var e = o(t);
    if ("function" != typeof e)
      throw TypeError(t + " is not iterable!");
    return r(e.call(t))
  }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }

  function o(t) {
    this.name = "DiskStorageUnavailableError",
      this.message = t || "Disk Storage is unavailable for this client",
      this.stack = (new Error).stack
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.diskStore = e.DB_VERSION = e.STORE_NAME = e.DB_NAME = void 0;
  var i = n(5),
    u = r(i),
    c = n(115),
    a = r(c),
    f = n(116),
    s = r(f),
    l = n(120),
    d = r(l);
  e.DiskStorageUnavailableError = o;
  var p = n(123),
    v = n(124),
    h = r(v),
    y = e.DB_NAME = "localforage",
    _ = e.STORE_NAME = "keyvaluepairs",
    m = e.DB_VERSION = 2,
    g = p.canUseDOM && "undefined" != typeof window && window.indexedDB || "undefined" != typeof self && self.indexedDB,
    w = {
      READONLY: "readonly",
      READWRITE: "readwrite"
    };
  if (g && p.canUseDOM)
    try {
      window.localStorage.setItem("test", "a"),
        window.localStorage.removeItem("test")
    } catch (t) {
      g = !1
    }
  o.prototype = (0,
      d.default)(Error.prototype),
    o.prototype.constructor = o;
  var b = function() {
    function t(e, n, r) {
      var o = this;
      (0,
        a.default)(this, t),
      this.isAvailable = function() {
          return g && !o._isFailing
        },
        this._dbName = e,
        this._storeName = n,
        this._version = r || 1,
        this._isFailing = !1
    }
    return (0,
        s.default)(t, [{
        key: "_getDB",
        value: function() {
          var t = this;
          return this._DB || (this._DB = new u.default(function(e, n) {
              var r = indexedDB.open(t._dbName, t._version);
              r.onerror = function() {
                  return n(r.error), !0
                },
                r.onupgradeneeded = function(e) {
                  var n = e.target.result;
                  n.objectStoreNames.contains(t._storeName) || n.createObjectStore(t._storeName)
                },
                r.onsuccess = function() {
                  e(r.result)
                }
            })),
            this._DB
        }
      }, {
        key: "_withStore",
        value: function(t, e) {
          var n = this;
          return this.isAvailable() ? this._getDB().then(function(r) {
            return new u.default(function(i, u) {
              var c = r.transaction(n._storeName, t);
              c.oncomplete = function() {
                  i()
                },
                c.onerror = function() {
                  var t = c.error;
                  u(t)
                },
                r.objectStoreNames.contains(n._storeName) ? e(c.objectStore(n._storeName)) : u(new o('Object store "' + n._storeName + '" does not exist in DB "' + n._dbName + '".'))
            })
          }).catch(function(t) {
            return n._isFailing = !0,
              (0,
                h.default)(t),
              u.default.resolve()
          }) : u.default.reject(new o)
        }
      }, {
        key: "get",
        value: function(t) {
          var e = void 0;
          return this._withStore(w.READONLY, function(n) {
            e = n.get(t)
          }).then(function() {
            return e && e.result
          })
        }
      }, {
        key: "set",
        value: function(t, e) {
          return this._withStore(w.READWRITE, function(n) {
            n.put(e, t)
          })
        }
      }, {
        key: "clear",
        value: function() {
          return this._withStore(w.READWRITE, function(t) {
            t.clear()
          })
        }
      }, {
        key: "delete",
        value: function(t) {
          return this._withStore(w.READWRITE, function(e) {
            e.delete(t)
          })
        }
      }, {
        key: "iterate",
        value: function(t) {
          return this._withStore(w.READONLY, function(e) {
            e.openCursor().onsuccess = function() {
              this.result && (t(this.result.value, this.result.key),
                this.result.continue())
            }
          })
        }
      }]),
      t
  }();
  e.default = b;
  e.diskStore = new b(y, _, m)
}, function(t, e) {
  "use strict";
  e.__esModule = !0,
    e.default = function(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
    }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  e.__esModule = !0;
  var o = n(117),
    i = r(o);
  e.default = function() {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        r.enumerable = r.enumerable || !1,
          r.configurable = !0,
          "value" in r && (r.writable = !0),
          (0,
            i.default)(t, r.key, r)
      }
    }
    return function(e, n, r) {
      return n && t(e.prototype, n),
        r && t(e, r),
        e
    }
  }()
}, function(t, e, n) {
  t.exports = {
    default: n(118),
    __esModule: !0
  }
}, function(t, e, n) {
  n(119);
  var r = n(16).Object;
  t.exports = function(t, e, n) {
    return r.defineProperty(t, e, n)
  }
}, function(t, e, n) {
  var r = n(14);
  r(r.S + r.F * !n(24), "Object", {
    defineProperty: n(20).f
  })
}, function(t, e, n) {
  t.exports = {
    default: n(121),
    __esModule: !0
  }
}, function(t, e, n) {
  n(122);
  var r = n(16).Object;
  t.exports = function(t, e) {
    return r.create(t, e)
  }
}, function(t, e, n) {
  var r = n(14);
  r(r.S, "Object", {
    create: n(33)
  })
}, function(t, e) {
  "use strict";
  var n = !("undefined" == typeof window || !window.document || !window.document.createElement),
    r = {
      canUseDOM: n,
      canUseWorkers: "undefined" != typeof Worker,
      canUseEventListeners: n && !(!window.addEventListener && !window.attachEvent),
      canUseViewport: n && !!window.screen,
      isInWorker: !n
    };
  t.exports = r
}, function(t, e) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = [],
    r = (e.getErrorClass = function(t) {
        try {
          return t.constructor.name
        } catch (t) {
          return "unknown error class"
        }
      },
      e.report = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r = e.extra,
          o = e.level,
          i = e.logger,
          u = e.tags;
        n.forEach(function(e) {
          return e({
            error: t,
            extra: r,
            level: o,
            logger: i,
            tags: u
          })
        })
      }
    );
  e.install = function(t) {
      n = t
    },
    e.uninstall = function() {
      n.length = 0
    };
  e.default = r
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.handleInstall = e.handleFetch = e.popularEmojiUrls = void 0;
  var o = n(5),
    i = r(o),
    u = n(75),
    c = n(126),
    a = "twemoji",
    f = ["❤", "😂", "😒", "😍", "☺", "👌", "😘", "😊", "😔", "😩", "😭", "😭", "😁", "💕", "😳", "👍", "🙌", "😉", "💁"],
    s = function(t) {
      return t.url
    },
    l = e.popularEmojiUrls = f.map(c.getTwemojiUrl),
    d = e.handleFetch = function(t) {
      var e = t.request;
      l.indexOf(e.url) !== -1 && t.respondWith((0,
        u.cacheFirst)(a, e))
    },
    p = e.handleInstall = function(t) {
      t.waitUntil(caches.open(a).then(function(t) {
        return t.keys().then(function(e) {
          var n = e.map(s),
            r = l.filter(function(t) {
              return n.indexOf(t) === -1
            }).map(function(t) {
              return new Request(t, {
                mode: "cors"
              })
            });
          return t.addAll(r),
            i.default.resolve()
        })
      }))
    };
  self.addEventListener("fetch", d),
    self.addEventListener("install", p)
}, function(t, e) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var n = "abs-0.twimg.com",
    r = (e.getTwemojiUrl = function(t) {
        var e = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : n,
          c(t));
        return "https://" + n + "/emoji/v2/svg/" + e + ".svg"
      },
      /\uFE0F/g),
    o = String.fromCharCode(8205),
    i = e.removeImageFlags = function(t) {
      return t.indexOf(o) < 0 ? t.replace(r, "") : t
    },
    u = function(t) {
      for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "-", n = [], r = 0, o = 0, i = 0; i < t.length;)
        r = t.charCodeAt(i++),
        o ? (n.push((65536 + (o - 55296 << 10) + (r - 56320)).toString(16)),
          o = 0) : r > 55296 && r <= 56319 ? o = r : n.push(r.toString(16));
      return n.join(e)
    },
    c = function(t) {
      return u(i(t))
    }
}, function(t, e, n) {
  "use strict";

  function r(t) {
    if (t && t.__esModule)
      return t;
    var e = {};
    if (null != t)
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    return e.default = t,
      e
  }

  function o(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.handleNotificationClick = e.handleNotificationDismiss = e.handlePush = void 0;
  var i = n(76),
    u = o(i),
    c = n(128),
    a = r(c),
    f = n(131),
    s = n(132),
    l = o(s),
    d = e.handlePush = function(t) {
      var e = t.data.json();
      a.scribeActionForData("impression", e.data);
      var n = a.shouldShowNotification(e.data && e.data.uri);
      return t.waitUntil(n.then(function(t) {
        return t && a.showNotification(e.title, (0,
          u.default)({}, e, {
          badge: l.default
        }))
      }))
    },
    p = e.handleNotificationDismiss = function(t) {
      var e = t.notification.data;
      a.scribeActionForData("dismiss", e)
    },
    v = e.handleNotificationClick = function(t) {
      var e = t.notification.data;
      return t.notification.close(),
        a.scribeActionForData("open", e),
        t.waitUntil(h(e.uri || "/"))
    },
    h = function(t) {
      return a.getBestClient().then(function(e) {
        return e && e.focus ? e.focus().then(function() {
          return e.postMessage({
            type: f.ACTION_NAVIGATE,
            payload: t
          })
        }) : a.openUri(t)
      })
    };
  self.addEventListener("push", d),
    self.addEventListener("notificationclose", p),
    self.addEventListener("notificationclick", v)
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.getFocusedClient = e.getBestClient = e.shouldShowNotification = e.openUri = e.showNotification = e.scribeActionForData = void 0;
  var o = n(129),
    i = r(o),
    u = (e.scribeActionForData = function(t, e) {
        return (0,
          i.default)({
          section: "push",
          element: e && e.scribe_target || "other",
          action: t
        }, {
          event_value: e && e.impression_id
        })
      },
      e.showNotification = function(t, e) {
        return self.registration.showNotification(t, e)
      },
      e.openUri = function(t) {
        return self.clients.openWindow(t)
      },
      e.shouldShowNotification = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u;
        return e().then(function(e) {
          if (!e || !t)
            return !0;
          var n = void 0;
          try {
            n = new URL(e.url)
          } catch (t) {
            return !0
          }
          return t.match(/^\/messages/) ? !("/messages" === n.pathname || n.pathname === t) : !("/notifications" === n.pathname)
        })
      },
      e.getBestClient = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = t.preferVisible,
          n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : self.clients.matchAll({
            type: "window"
          });
        return n.then(function(t) {
          var n = t.filter(function(t) {
              return "top-level" === t.frameType
            }),
            r = n.filter(function(t) {
              return !e || "visible" === t.visibilityState
            });
          return r[0] || n[0]
        })
      },
      e.getFocusedClient = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : self.clients.matchAll({
          type: "window"
        });
        return t.then(function(t) {
          return t.filter(function(t) {
            return t.focused && "top-level" === t.frameType && "visible" === t.visibilityState
          })[0]
        })
      }
    )
}, function(t, e, n) {
  "use strict";

  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.getScribeJSON = void 0;
  var o = n(76),
    i = r(o),
    u = n(84),
    c = r(u),
    a = n(130),
    f = "m5";
  e.default = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    self.fetch("/i/jot", {
      credentials: "include",
      method: "post",
      headers: {
        Accept: "application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "log=" + encodeURIComponent((0,
        c.default)(s(t, e)))
    })
  };
  var s = e.getScribeJSON = function(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (!t || !t.action)
      throw new Error("You must specify an action term in your client_event.");
    var n = {
      client: f,
      page: "app",
      section: t.section || "",
      component: t.component || "",
      element: t.element || "",
      action: t.action
    };
    return (0,
      i.default)({}, e, {
      event_namespace: n,
      _category_: "client_event",
      triggered_on: Date.now(),
      format_version: 2,
      client_app_id: a.CLIENT_APPLICATION_ID
    })
  }
}, function(t, e) {
  "use strict";
  t.exports = {
    API_CARDS_PLATFORM: "Web-12",
    BEARER_TOKEN: "AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
    CLIENT_APPLICATION_ID: "3033300",
    CSRF_COOKIE: "ct0",
    EXPERIMENT_OVERRIDE_COOKIE: "ab_decider",
    FLASH_MESSAGE_COOKIE: "fm",
    GCM_SENDER_ID: "49625052041",
    GUEST_ID_COOKIE: "guest_id",
    GUEST_TOKEN_COOKIE: "gt",
    LOGLENS_INDEX_PREFIX: "responsive_web",
    MOBILE_LOGIN_COOKIE: "_mb_tk",
    MUTE_EDUCATION_COOKIE: "conversation_muted_education",
    MUTE_KEYWORD_EDUCATION_COOKIE: "mute_keyword_education",
    PUBLIC_HOST: "ma-0.twimg.com",
    SERVICE_WORKER_PATH: "/sw.js",
    TWID_COOKIE: "twid",
    TWITTER_IP_TAGS_HEADER: "x-twitter-ip-tags",
    UNMUTE_KEYWORD_CONFIRMATION_COOKIE: "unmute_keyword_confirmation",
    VAPID_PUBLIC_KEY: new Uint8Array([4, 94, 104, 18, 141, 49, 13, 74, 96, 202, 82, 131, 78, 91, 29, 242, 150, 102, 197, 0, 53, 149, 230, 8, 54, 38, 62, 173, 43, 28, 89, 130, 191, 222, 213, 128, 147, 62, 21, 49, 187, 95, 212, 194, 196, 253, 140, 157, 234, 34, 8, 234, 143, 158, 221, 15, 83, 8, 222, 111, 100, 204, 213, 48, 75])
  }
}, function(t, e) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  e.ACTION_NAVIGATE = "ACTION_NAVIGATE"
}, function(t, e, n) {
  t.exports = n.p + "logo.9d0ec6feeefcbe03.png"
}]);
//# sourceMappingURL=main.1dc737bd24d2b80a.js.map