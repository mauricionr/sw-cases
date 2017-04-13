! function(t) {
  function e(n) {
    if (r[n])
      return r[n].exports;
    var o = r[n] = {
      exports: {},
      id: n,
      loaded: !1
    };
    return t[n].call(o.exports, o, o.exports, e),
      o.loaded = !0,
      o.exports
  }
  var r = {};
  return e.m = t,
    e.c = r,
    e.p = "",
    e(0)
}([function(t, e, r) {
  "use strict";
  r(1),
    r(3)
}, function(t, e, r) {
  "use strict";

  function n(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }

  function o() {
    return h.default.open("next-flags", 1, function(t) {
      t.createObjectStore("flags")
    })
  }

  function i() {
    return l || (l = o()),
      l
  }

  function u(t) {
    return i().then(function(e) {
      var r = e.transaction("flags", "readwrite");
      return r.objectStore("flags").put(t, "flags"),
        r.complete
    }).then(function() {
      c = t
    })
  }

  function s() {
    return i().then(function(t) {
      var e = t.transaction("flags");
      return e.objectStore("flags").get("flags"),
        e.complete
    }).then(function(t) {
      c = t || c
    })
  }

  function f(t) {
    return c[t]
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
    }),
    e.setFlags = e.getFlag = void 0;
  var a = r(2),
    h = n(a),
    c = {},
    l = void 0;
  s(),
    setInterval(s, 3e5),
    self.addEventListener("message", function(t) {
      var e = t.data;
      if ("flagsUpdate" === e.type)
        return u(e.flags).then(function() {
          return t.ports[0].postMessage("success")
        })
    }),
    e.getFlag = f,
    e.setFlags = u
}, function(t, e, r) {
  "use strict";
  ! function() {
    function e(t) {
      return Array.prototype.slice.call(t)
    }

    function r(t) {
      return new Promise(function(e, r) {
        t.onsuccess = function() {
            e(t.result)
          },
          t.onerror = function() {
            r(t.error)
          }
      })
    }

    function n(t, e, n) {
      var o, i = new Promise(function(i, u) {
        o = t[e].apply(t, n),
          r(o).then(i, u)
      });
      return i.request = o,
        i
    }

    function o(t, e, r) {
      var o = n(t, e, r);
      return o.then(function(t) {
        if (t)
          return new h(t, o.request)
      })
    }

    function i(t, e, r) {
      r.forEach(function(r) {
        Object.defineProperty(t.prototype, r, {
          get: function() {
            return this[e][r]
          },
          set: function(t) {
            this[e][r] = t
          }
        })
      })
    }

    function u(t, e, r, o) {
      o.forEach(function(o) {
        o in r.prototype && (t.prototype[o] = function() {
          return n(this[e], o, arguments)
        })
      })
    }

    function s(t, e, r, n) {
      n.forEach(function(n) {
        n in r.prototype && (t.prototype[n] = function() {
          return this[e][n].apply(this[e], arguments)
        })
      })
    }

    function f(t, e, r, n) {
      n.forEach(function(n) {
        n in r.prototype && (t.prototype[n] = function() {
          return o(this[e], n, arguments)
        })
      })
    }

    function a(t) {
      this._index = t
    }

    function h(t, e) {
      this._cursor = t,
        this._request = e
    }

    function c(t) {
      this._store = t
    }

    function l(t) {
      this._tx = t,
        this.complete = new Promise(function(e, r) {
          t.oncomplete = function() {
              e()
            },
            t.onerror = function() {
              r(t.error)
            },
            t.onabort = function() {
              r(t.error)
            }
        })
    }

    function p(t, e, r) {
      this._db = t,
        this.oldVersion = e,
        this.transaction = new l(r)
    }

    function g(t) {
      this._db = t
    }
    i(a, "_index", ["name", "keyPath", "multiEntry", "unique"]),
      u(a, "_index", IDBIndex, ["get", "getKey", "getAll", "getAllKeys", "count"]),
      f(a, "_index", IDBIndex, ["openCursor", "openKeyCursor"]),
      i(h, "_cursor", ["direction", "key", "primaryKey", "value"]),
      u(h, "_cursor", IDBCursor, ["update", "delete"]), ["advance", "continue", "continuePrimaryKey"].forEach(function(t) {
        t in IDBCursor.prototype && (h.prototype[t] = function() {
          var e = this,
            n = arguments;
          return Promise.resolve().then(function() {
            return e._cursor[t].apply(e._cursor, n),
              r(e._request).then(function(t) {
                if (t)
                  return new h(t, e._request)
              })
          })
        })
      }),
      c.prototype.createIndex = function() {
        return new a(this._store.createIndex.apply(this._store, arguments))
      },
      c.prototype.index = function() {
        return new a(this._store.index.apply(this._store, arguments))
      },
      i(c, "_store", ["name", "keyPath", "indexNames", "autoIncrement"]),
      u(c, "_store", IDBObjectStore, ["put", "add", "delete", "clear", "get", "getAll", "getKey", "getAllKeys", "count"]),
      f(c, "_store", IDBObjectStore, ["openCursor", "openKeyCursor"]),
      s(c, "_store", IDBObjectStore, ["deleteIndex"]),
      l.prototype.objectStore = function() {
        return new c(this._tx.objectStore.apply(this._tx, arguments))
      },
      i(l, "_tx", ["objectStoreNames", "mode"]),
      s(l, "_tx", IDBTransaction, ["abort"]),
      p.prototype.createObjectStore = function() {
        return new c(this._db.createObjectStore.apply(this._db, arguments))
      },
      i(p, "_db", ["name", "version", "objectStoreNames"]),
      s(p, "_db", IDBDatabase, ["deleteObjectStore", "close"]),
      g.prototype.transaction = function() {
        return new l(this._db.transaction.apply(this._db, arguments))
      },
      i(g, "_db", ["name", "version", "objectStoreNames"]),
      s(g, "_db", IDBDatabase, ["close"]), ["openCursor", "openKeyCursor"].forEach(function(t) {
        [c, a].forEach(function(r) {
          r.prototype[t.replace("open", "iterate")] = function() {
            var r = e(arguments),
              n = r[r.length - 1],
              o = this._store || this._index,
              i = o[t].apply(o, r.slice(0, -1));
            i.onsuccess = function() {
              n(i.result)
            }
          }
        })
      }), [a, c].forEach(function(t) {
        t.prototype.getAll || (t.prototype.getAll = function(t, e) {
          var r = this,
            n = [];
          return new Promise(function(o) {
            r.iterateCursor(t, function(t) {
              return t ? (n.push(t.value),
                void 0 !== e && n.length == e ? void o(n) : void t.continue()) : void o(n)
            })
          })
        })
      });
    var y = {
      open: function(t, e, r) {
        var o = n(indexedDB, "open", [t, e]),
          i = o.request;
        return i.onupgradeneeded = function(t) {
            r && r(new p(i.result, t.oldVersion, i.transaction))
          },
          o.then(function(t) {
            return new g(t)
          })
      },
      delete: function(t) {
        return n(indexedDB, "deleteDatabase", [t])
      }
    };
    t.exports = y
  }()
}, function(t, e, r) {
  "use strict";

  function n(t) {
    return t && t.__esModule ? t : {
      default: t
    }
  }
  var o = r(4),
    i = n(o);
  self.addEventListener("push", function(t) {
      var e = t.data ? t.data.text() : "",
        r = "New article in your myFT page",
        n = "next-myft-article",
        o = "https://www.ft.com/__assets/creatives/icons/myft-logo-grey-pink-bg.png",
        u = {},
        s = void 0;
      try {
        e = JSON.parse(e),
          e.uuid && (n = e.uuid,
            u.id = e.uuid,
            r = e.headline ? e.headline : r,
            e.subheading ? e.subheading : s,
            o = e.mainImage ? e.mainImage : o)
      } catch (t) {}
      t.waitUntil(new Promise(function(t) {
        try {
          (0,
            i.default)({
            category: "push",
            action: "shown",
            context: {
              type: u.id ? "story" : "fallback",
              storyUuid: u.id ? u.id : null
            },
            content: {
              uuid: u.id
            }
          })
        } catch (t) {}
        t(self.registration.showNotification(r, {
          requireInteraction: !1,
          body: s,
          tag: n,
          icon: o,
          data: u
        }))
      }))
    }),
    self.addEventListener("notificationclick", function(t) {
      t.notification.close(),
        t.waitUntil(clients.matchAll({
          type: "window"
        }).then(function(e) {
          var r = void 0;
          r = Notification.prototype.hasOwnProperty("data") && t.notification.data.id ? "/content/" + t.notification.data.id : "/myft/following",
            r += "#myft:notification:push",
            (0,
              i.default)({
              category: "push",
              action: "click",
              context: {
                url: "https://next.ft.com" + r
              },
              content: {
                uuid: t.notification.data ? t.notification.data.id : "default"
              }
            });
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            if (o.url.indexOf(r) > 0 && "focus" in o)
              return o.focus()
          }
          if (clients.openWindow)
            return clients.openWindow(r)
        }))
    })
}, function(t, e, r) {
  (function(r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
      }),
      e.default = function(t) {
        return t.context = t.context || {},
          t.system = t.system || {},
          t.user = t.user || {},
          t.context.product = "next",
          t.context.source = "next-service-worker",
          t.system.source = "next-service-worker",
          fetch("https://spoor-api.ft.com/ingest", {
            method: "post",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Content-Length": new r(JSON.stringify(t)).length
            },
            body: JSON.stringify(t)
          }).catch(function() {})
      },
      t.exports = e.default
  }).call(e, r(5).Buffer)
}, function(t, e, r) {
  (function(t) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license  MIT
     */
    "use strict";

    function n() {
      try {
        var t = new Uint8Array(1);
        return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function() {
              return 42
            }
          },
          42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
      } catch (t) {
        return !1
      }
    }

    function o() {
      return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
    }

    function i(t, e) {
      if (o() < e)
        throw new RangeError("Invalid typed array length");
      return u.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e),
          t.__proto__ = u.prototype) : (null === t && (t = new u(e)),
          t.length = e),
        t
    }

    function u(t, e, r) {
      if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u))
        return new u(t, e, r);
      if ("number" == typeof t) {
        if ("string" == typeof e)
          throw new Error("If encoding is specified then the first argument must be a string");
        return h(this, t)
      }
      return s(this, t, e, r)
    }

    function s(t, e, r, n) {
      if ("number" == typeof e)
        throw new TypeError('"value" argument must not be a number');
      return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? p(t, e, r, n) : "string" == typeof e ? c(t, e, r) : g(t, e)
    }

    function f(t) {
      if ("number" != typeof t)
        throw new TypeError('"size" argument must be a number');
      if (t < 0)
        throw new RangeError('"size" argument must not be negative')
    }

    function a(t, e, r, n) {
      return f(e),
        e <= 0 ? i(t, e) : void 0 !== r ? "string" == typeof n ? i(t, e).fill(r, n) : i(t, e).fill(r) : i(t, e)
    }

    function h(t, e) {
      if (f(e),
        t = i(t, e < 0 ? 0 : 0 | y(e)), !u.TYPED_ARRAY_SUPPORT)
        for (var r = 0; r < e; ++r)
          t[r] = 0;
      return t
    }

    function c(t, e, r) {
      if ("string" == typeof r && "" !== r || (r = "utf8"), !u.isEncoding(r))
        throw new TypeError('"encoding" must be a valid string encoding');
      var n = 0 | w(e, r);
      t = i(t, n);
      var o = t.write(e, r);
      return o !== n && (t = t.slice(0, o)),
        t
    }

    function l(t, e) {
      var r = e.length < 0 ? 0 : 0 | y(e.length);
      t = i(t, r);
      for (var n = 0; n < r; n += 1)
        t[n] = 255 & e[n];
      return t
    }

    function p(t, e, r, n) {
      if (e.byteLength,
        r < 0 || e.byteLength < r)
        throw new RangeError("'offset' is out of bounds");
      if (e.byteLength < r + (n || 0))
        throw new RangeError("'length' is out of bounds");
      return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n),
        u.TYPED_ARRAY_SUPPORT ? (t = e,
          t.__proto__ = u.prototype) : t = l(t, e),
        t
    }

    function g(t, e) {
      if (u.isBuffer(e)) {
        var r = 0 | y(e.length);
        return t = i(t, r),
          0 === t.length ? t : (e.copy(t, 0, 0, r),
            t)
      }
      if (e) {
        if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e)
          return "number" != typeof e.length || G(e.length) ? i(t, 0) : l(t, e);
        if ("Buffer" === e.type && $(e.data))
          return l(t, e.data)
      }
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
    }

    function y(t) {
      if (t >= o())
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
      return 0 | t
    }

    function d(t) {
      return +t != t && (t = 0),
        u.alloc(+t)
    }

    function w(t, e) {
      if (u.isBuffer(t))
        return t.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer))
        return t.byteLength;
      "string" != typeof t && (t = "" + t);
      var r = t.length;
      if (0 === r)
        return 0;
      for (var n = !1;;)
        switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return r;
          case "utf8":
          case "utf-8":
          case void 0:
            return J(t).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * r;
          case "hex":
            return r >>> 1;
          case "base64":
            return X(t).length;
          default:
            if (n)
              return J(t).length;
            e = ("" + e).toLowerCase(),
              n = !0
        }
    }

    function v(t, e, r) {
      var n = !1;
      if ((void 0 === e || e < 0) && (e = 0),
        e > this.length)
        return "";
      if ((void 0 === r || r > this.length) && (r = this.length),
        r <= 0)
        return "";
      if (r >>>= 0,
        e >>>= 0,
        r <= e)
        return "";
      for (t || (t = "utf8");;)
        switch (t) {
          case "hex":
            return Y(this, e, r);
          case "utf8":
          case "utf-8":
            return x(this, e, r);
          case "ascii":
            return U(this, e, r);
          case "latin1":
          case "binary":
            return O(this, e, r);
          case "base64":
            return T(this, e, r);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return C(this, e, r);
          default:
            if (n)
              throw new TypeError("Unknown encoding: " + t);
            t = (t + "").toLowerCase(),
              n = !0
        }
    }

    function _(t, e, r) {
      var n = t[e];
      t[e] = t[r],
        t[r] = n
    }

    function b(t, e, r, n, o) {
      if (0 === t.length)
        return -1;
      if ("string" == typeof r ? (n = r,
          r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648),
        r = +r,
        isNaN(r) && (r = o ? 0 : t.length - 1),
        r < 0 && (r = t.length + r),
        r >= t.length) {
        if (o)
          return -1;
        r = t.length - 1
      } else if (r < 0) {
        if (!o)
          return -1;
        r = 0
      }
      if ("string" == typeof e && (e = u.from(e, n)),
        u.isBuffer(e))
        return 0 === e.length ? -1 : m(t, e, r, n, o);
      if ("number" == typeof e)
        return e &= 255,
          u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : m(t, [e], r, n, o);
      throw new TypeError("val must be string, number or Buffer")
    }

    function m(t, e, r, n, o) {
      function i(t, e) {
        return 1 === u ? t[e] : t.readUInt16BE(e * u)
      }
      var u = 1,
        s = t.length,
        f = e.length;
      if (void 0 !== n && (n = String(n).toLowerCase(),
          "ucs2" === n || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
        if (t.length < 2 || e.length < 2)
          return -1;
        u = 2,
          s /= 2,
          f /= 2,
          r /= 2
      }
      var a;
      if (o) {
        var h = -1;
        for (a = r; a < s; a++)
          if (i(t, a) === i(e, h === -1 ? 0 : a - h)) {
            if (h === -1 && (h = a),
              a - h + 1 === f)
              return h * u
          } else
            h !== -1 && (a -= a - h),
            h = -1
      } else
        for (r + f > s && (r = s - f),
          a = r; a >= 0; a--) {
          for (var c = !0, l = 0; l < f; l++)
            if (i(t, a + l) !== i(e, l)) {
              c = !1;
              break
            }
          if (c)
            return a
        }
      return -1
    }

    function E(t, e, r, n) {
      r = Number(r) || 0;
      var o = t.length - r;
      n ? (n = Number(n),
        n > o && (n = o)) : n = o;
      var i = e.length;
      if (i % 2 !== 0)
        throw new TypeError("Invalid hex string");
      n > i / 2 && (n = i / 2);
      for (var u = 0; u < n; ++u) {
        var s = parseInt(e.substr(2 * u, 2), 16);
        if (isNaN(s))
          return u;
        t[r + u] = s
      }
      return u
    }

    function A(t, e, r, n) {
      return Z(J(e, t.length - r), t, r, n)
    }

    function R(t, e, r, n) {
      return Z(V(e), t, r, n)
    }

    function P(t, e, r, n) {
      return R(t, e, r, n)
    }

    function B(t, e, r, n) {
      return Z(X(e), t, r, n)
    }

    function S(t, e, r, n) {
      return Z(W(e, t.length - r), t, r, n)
    }

    function T(t, e, r) {
      return 0 === e && r === t.length ? H.fromByteArray(t) : H.fromByteArray(t.slice(e, r))
    }

    function x(t, e, r) {
      r = Math.min(t.length, r);
      for (var n = [], o = e; o < r;) {
        var i = t[o],
          u = null,
          s = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
        if (o + s <= r) {
          var f, a, h, c;
          switch (s) {
            case 1:
              i < 128 && (u = i);
              break;
            case 2:
              f = t[o + 1],
                128 === (192 & f) && (c = (31 & i) << 6 | 63 & f,
                  c > 127 && (u = c));
              break;
            case 3:
              f = t[o + 1],
                a = t[o + 2],
                128 === (192 & f) && 128 === (192 & a) && (c = (15 & i) << 12 | (63 & f) << 6 | 63 & a,
                  c > 2047 && (c < 55296 || c > 57343) && (u = c));
              break;
            case 4:
              f = t[o + 1],
                a = t[o + 2],
                h = t[o + 3],
                128 === (192 & f) && 128 === (192 & a) && 128 === (192 & h) && (c = (15 & i) << 18 | (63 & f) << 12 | (63 & a) << 6 | 63 & h,
                  c > 65535 && c < 1114112 && (u = c))
          }
        }
        null === u ? (u = 65533,
            s = 1) : u > 65535 && (u -= 65536,
            n.push(u >>> 10 & 1023 | 55296),
            u = 56320 | 1023 & u),
          n.push(u),
          o += s
      }
      return I(n)
    }

    function I(t) {
      var e = t.length;
      if (e <= tt)
        return String.fromCharCode.apply(String, t);
      for (var r = "", n = 0; n < e;)
        r += String.fromCharCode.apply(String, t.slice(n, n += tt));
      return r
    }

    function U(t, e, r) {
      var n = "";
      r = Math.min(t.length, r);
      for (var o = e; o < r; ++o)
        n += String.fromCharCode(127 & t[o]);
      return n
    }

    function O(t, e, r) {
      var n = "";
      r = Math.min(t.length, r);
      for (var o = e; o < r; ++o)
        n += String.fromCharCode(t[o]);
      return n
    }

    function Y(t, e, r) {
      var n = t.length;
      (!e || e < 0) && (e = 0),
      (!r || r < 0 || r > n) && (r = n);
      for (var o = "", i = e; i < r; ++i)
        o += z(t[i]);
      return o
    }

    function C(t, e, r) {
      for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2)
        o += String.fromCharCode(n[i] + 256 * n[i + 1]);
      return o
    }

    function D(t, e, r) {
      if (t % 1 !== 0 || t < 0)
        throw new RangeError("offset is not uint");
      if (t + e > r)
        throw new RangeError("Trying to access beyond buffer length")
    }

    function M(t, e, r, n, o, i) {
      if (!u.isBuffer(t))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (e > o || e < i)
        throw new RangeError('"value" argument is out of bounds');
      if (r + n > t.length)
        throw new RangeError("Index out of range")
    }

    function L(t, e, r, n) {
      e < 0 && (e = 65535 + e + 1);
      for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o)
        t[r + o] = (e & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o)
    }

    function j(t, e, r, n) {
      e < 0 && (e = 4294967295 + e + 1);
      for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o)
        t[r + o] = e >>> 8 * (n ? o : 3 - o) & 255
    }

    function N(t, e, r, n, o, i) {
      if (r + n > t.length)
        throw new RangeError("Index out of range");
      if (r < 0)
        throw new RangeError("Index out of range")
    }

    function k(t, e, r, n, o) {
      return o || N(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38),
        Q.write(t, e, r, n, 23, 4),
        r + 4
    }

    function F(t, e, r, n, o) {
      return o || N(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308),
        Q.write(t, e, r, n, 52, 8),
        r + 8
    }

    function q(t) {
      if (t = K(t).replace(et, ""),
        t.length < 2)
        return "";
      for (; t.length % 4 !== 0;)
        t += "=";
      return t
    }

    function K(t) {
      return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }

    function z(t) {
      return t < 16 ? "0" + t.toString(16) : t.toString(16)
    }

    function J(t, e) {
      e = e || 1 / 0;
      for (var r, n = t.length, o = null, i = [], u = 0; u < n; ++u) {
        if (r = t.charCodeAt(u),
          r > 55295 && r < 57344) {
          if (!o) {
            if (r > 56319) {
              (e -= 3) > -1 && i.push(239, 191, 189);
              continue
            }
            if (u + 1 === n) {
              (e -= 3) > -1 && i.push(239, 191, 189);
              continue
            }
            o = r;
            continue
          }
          if (r < 56320) {
            (e -= 3) > -1 && i.push(239, 191, 189),
              o = r;
            continue
          }
          r = (o - 55296 << 10 | r - 56320) + 65536
        } else
          o && (e -= 3) > -1 && i.push(239, 191, 189);
        if (o = null,
          r < 128) {
          if ((e -= 1) < 0)
            break;
          i.push(r)
        } else if (r < 2048) {
          if ((e -= 2) < 0)
            break;
          i.push(r >> 6 | 192, 63 & r | 128)
        } else if (r < 65536) {
          if ((e -= 3) < 0)
            break;
          i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
        } else {
          if (!(r < 1114112))
            throw new Error("Invalid code point");
          if ((e -= 4) < 0)
            break;
          i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
        }
      }
      return i
    }

    function V(t) {
      for (var e = [], r = 0; r < t.length; ++r)
        e.push(255 & t.charCodeAt(r));
      return e
    }

    function W(t, e) {
      for (var r, n, o, i = [], u = 0; u < t.length && !((e -= 2) < 0); ++u)
        r = t.charCodeAt(u),
        n = r >> 8,
        o = r % 256,
        i.push(o),
        i.push(n);
      return i
    }

    function X(t) {
      return H.toByteArray(q(t))
    }

    function Z(t, e, r, n) {
      for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
        e[o + r] = t[o];
      return o
    }

    function G(t) {
      return t !== t
    }
    var H = r(6),
      Q = r(7),
      $ = r(8);
    e.Buffer = u,
      e.SlowBuffer = d,
      e.INSPECT_MAX_BYTES = 50,
      u.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : n(),
      e.kMaxLength = o(),
      u.poolSize = 8192,
      u._augment = function(t) {
        return t.__proto__ = u.prototype,
          t
      },
      u.from = function(t, e, r) {
        return s(null, t, e, r)
      },
      u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype,
        u.__proto__ = Uint8Array,
        "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
          value: null,
          configurable: !0
        })),
      u.alloc = function(t, e, r) {
        return a(null, t, e, r)
      },
      u.allocUnsafe = function(t) {
        return h(null, t)
      },
      u.allocUnsafeSlow = function(t) {
        return h(null, t)
      },
      u.isBuffer = function(t) {
        return !(null == t || !t._isBuffer)
      },
      u.compare = function(t, e) {
        if (!u.isBuffer(t) || !u.isBuffer(e))
          throw new TypeError("Arguments must be Buffers");
        if (t === e)
          return 0;
        for (var r = t.length, n = e.length, o = 0, i = Math.min(r, n); o < i; ++o)
          if (t[o] !== e[o]) {
            r = t[o],
              n = e[o];
            break
          }
        return r < n ? -1 : n < r ? 1 : 0
      },
      u.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1
        }
      },
      u.concat = function(t, e) {
        if (!$(t))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length)
          return u.alloc(0);
        var r;
        if (void 0 === e)
          for (e = 0,
            r = 0; r < t.length; ++r)
            e += t[r].length;
        var n = u.allocUnsafe(e),
          o = 0;
        for (r = 0; r < t.length; ++r) {
          var i = t[r];
          if (!u.isBuffer(i))
            throw new TypeError('"list" argument must be an Array of Buffers');
          i.copy(n, o),
            o += i.length
        }
        return n
      },
      u.byteLength = w,
      u.prototype._isBuffer = !0,
      u.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2)
          _(this, e, e + 1);
        return this
      },
      u.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4)
          _(this, e, e + 3),
          _(this, e + 1, e + 2);
        return this
      },
      u.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8)
          _(this, e, e + 7),
          _(this, e + 1, e + 6),
          _(this, e + 2, e + 5),
          _(this, e + 3, e + 4);
        return this
      },
      u.prototype.toString = function() {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? x(this, 0, t) : v.apply(this, arguments)
      },
      u.prototype.equals = function(t) {
        if (!u.isBuffer(t))
          throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === u.compare(this, t)
      },
      u.prototype.inspect = function() {
        var t = "",
          r = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "),
            this.length > r && (t += " ... ")),
          "<Buffer " + t + ">"
      },
      u.prototype.compare = function(t, e, r, n, o) {
        if (!u.isBuffer(t))
          throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0),
          void 0 === r && (r = t ? t.length : 0),
          void 0 === n && (n = 0),
          void 0 === o && (o = this.length),
          e < 0 || r > t.length || n < 0 || o > this.length)
          throw new RangeError("out of range index");
        if (n >= o && e >= r)
          return 0;
        if (n >= o)
          return -1;
        if (e >= r)
          return 1;
        if (e >>>= 0,
          r >>>= 0,
          n >>>= 0,
          o >>>= 0,
          this === t)
          return 0;
        for (var i = o - n, s = r - e, f = Math.min(i, s), a = this.slice(n, o), h = t.slice(e, r), c = 0; c < f; ++c)
          if (a[c] !== h[c]) {
            i = a[c],
              s = h[c];
            break
          }
        return i < s ? -1 : s < i ? 1 : 0
      },
      u.prototype.includes = function(t, e, r) {
        return this.indexOf(t, e, r) !== -1
      },
      u.prototype.indexOf = function(t, e, r) {
        return b(this, t, e, r, !0)
      },
      u.prototype.lastIndexOf = function(t, e, r) {
        return b(this, t, e, r, !1)
      },
      u.prototype.write = function(t, e, r, n) {
        if (void 0 === e)
          n = "utf8",
          r = this.length,
          e = 0;
        else if (void 0 === r && "string" == typeof e)
          n = e,
          r = this.length,
          e = 0;
        else {
          if (!isFinite(e))
            throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0,
            isFinite(r) ? (r |= 0,
              void 0 === n && (n = "utf8")) : (n = r,
              r = void 0)
        }
        var o = this.length - e;
        if ((void 0 === r || r > o) && (r = o),
          t.length > 0 && (r < 0 || e < 0) || e > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var i = !1;;)
          switch (n) {
            case "hex":
              return E(this, t, e, r);
            case "utf8":
            case "utf-8":
              return A(this, t, e, r);
            case "ascii":
              return R(this, t, e, r);
            case "latin1":
            case "binary":
              return P(this, t, e, r);
            case "base64":
              return B(this, t, e, r);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return S(this, t, e, r);
            default:
              if (i)
                throw new TypeError("Unknown encoding: " + n);
              n = ("" + n).toLowerCase(),
                i = !0
          }
      },
      u.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        }
      };
    var tt = 4096;
    u.prototype.slice = function(t, e) {
        var r = this.length;
        t = ~~t,
          e = void 0 === e ? r : ~~e,
          t < 0 ? (t += r,
            t < 0 && (t = 0)) : t > r && (t = r),
          e < 0 ? (e += r,
            e < 0 && (e = 0)) : e > r && (e = r),
          e < t && (e = t);
        var n;
        if (u.TYPED_ARRAY_SUPPORT)
          n = this.subarray(t, e),
          n.__proto__ = u.prototype;
        else {
          var o = e - t;
          n = new u(o, void 0);
          for (var i = 0; i < o; ++i)
            n[i] = this[i + t]
        }
        return n
      },
      u.prototype.readUIntLE = function(t, e, r) {
        t |= 0,
          e |= 0,
          r || D(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);)
          n += this[t + i] * o;
        return n
      },
      u.prototype.readUIntBE = function(t, e, r) {
        t |= 0,
          e |= 0,
          r || D(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);)
          n += this[t + --e] * o;
        return n
      },
      u.prototype.readUInt8 = function(t, e) {
        return e || D(t, 1, this.length),
          this[t]
      },
      u.prototype.readUInt16LE = function(t, e) {
        return e || D(t, 2, this.length),
          this[t] | this[t + 1] << 8
      },
      u.prototype.readUInt16BE = function(t, e) {
        return e || D(t, 2, this.length),
          this[t] << 8 | this[t + 1]
      },
      u.prototype.readUInt32LE = function(t, e) {
        return e || D(t, 4, this.length),
          (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
      },
      u.prototype.readUInt32BE = function(t, e) {
        return e || D(t, 4, this.length),
          16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
      },
      u.prototype.readIntLE = function(t, e, r) {
        t |= 0,
          e |= 0,
          r || D(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);)
          n += this[t + i] * o;
        return o *= 128,
          n >= o && (n -= Math.pow(2, 8 * e)),
          n
      },
      u.prototype.readIntBE = function(t, e, r) {
        t |= 0,
          e |= 0,
          r || D(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);)
          i += this[t + --n] * o;
        return o *= 128,
          i >= o && (i -= Math.pow(2, 8 * e)),
          i
      },
      u.prototype.readInt8 = function(t, e) {
        return e || D(t, 1, this.length),
          128 & this[t] ? (255 - this[t] + 1) * -1 : this[t]
      },
      u.prototype.readInt16LE = function(t, e) {
        e || D(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 4294901760 | r : r
      },
      u.prototype.readInt16BE = function(t, e) {
        e || D(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 4294901760 | r : r
      },
      u.prototype.readInt32LE = function(t, e) {
        return e || D(t, 4, this.length),
          this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
      },
      u.prototype.readInt32BE = function(t, e) {
        return e || D(t, 4, this.length),
          this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
      },
      u.prototype.readFloatLE = function(t, e) {
        return e || D(t, 4, this.length),
          Q.read(this, t, !0, 23, 4)
      },
      u.prototype.readFloatBE = function(t, e) {
        return e || D(t, 4, this.length),
          Q.read(this, t, !1, 23, 4)
      },
      u.prototype.readDoubleLE = function(t, e) {
        return e || D(t, 8, this.length),
          Q.read(this, t, !0, 52, 8)
      },
      u.prototype.readDoubleBE = function(t, e) {
        return e || D(t, 8, this.length),
          Q.read(this, t, !1, 52, 8)
      },
      u.prototype.writeUIntLE = function(t, e, r, n) {
        if (t = +t,
          e |= 0,
          r |= 0, !n) {
          var o = Math.pow(2, 8 * r) - 1;
          M(this, t, e, r, o, 0)
        }
        var i = 1,
          u = 0;
        for (this[e] = 255 & t; ++u < r && (i *= 256);)
          this[e + u] = t / i & 255;
        return e + r
      },
      u.prototype.writeUIntBE = function(t, e, r, n) {
        if (t = +t,
          e |= 0,
          r |= 0, !n) {
          var o = Math.pow(2, 8 * r) - 1;
          M(this, t, e, r, o, 0)
        }
        var i = r - 1,
          u = 1;
        for (this[e + i] = 255 & t; --i >= 0 && (u *= 256);)
          this[e + i] = t / u & 255;
        return e + r
      },
      u.prototype.writeUInt8 = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 1, 255, 0),
          u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
          this[e] = 255 & t,
          e + 1
      },
      u.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 2, 65535, 0),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8) : L(this, t, e, !0),
          e + 2
      },
      u.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 2, 65535, 0),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
            this[e + 1] = 255 & t) : L(this, t, e, !1),
          e + 2
      },
      u.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 4, 4294967295, 0),
          u.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24,
            this[e + 2] = t >>> 16,
            this[e + 1] = t >>> 8,
            this[e] = 255 & t) : j(this, t, e, !0),
          e + 4
      },
      u.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 4, 4294967295, 0),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
            this[e + 1] = t >>> 16,
            this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t) : j(this, t, e, !1),
          e + 4
      },
      u.prototype.writeIntLE = function(t, e, r, n) {
        if (t = +t,
          e |= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          M(this, t, e, r, o - 1, -o)
        }
        var i = 0,
          u = 1,
          s = 0;
        for (this[e] = 255 & t; ++i < r && (u *= 256);)
          t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
          this[e + i] = (t / u >> 0) - s & 255;
        return e + r
      },
      u.prototype.writeIntBE = function(t, e, r, n) {
        if (t = +t,
          e |= 0, !n) {
          var o = Math.pow(2, 8 * r - 1);
          M(this, t, e, r, o - 1, -o)
        }
        var i = r - 1,
          u = 1,
          s = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (u *= 256);)
          t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
          this[e + i] = (t / u >> 0) - s & 255;
        return e + r
      },
      u.prototype.writeInt8 = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 1, 127, -128),
          u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
          t < 0 && (t = 255 + t + 1),
          this[e] = 255 & t,
          e + 1
      },
      u.prototype.writeInt16LE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 2, 32767, -32768),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8) : L(this, t, e, !0),
          e + 2
      },
      u.prototype.writeInt16BE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 2, 32767, -32768),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8,
            this[e + 1] = 255 & t) : L(this, t, e, !1),
          e + 2
      },
      u.prototype.writeInt32LE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 4, 2147483647, -2147483648),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t,
            this[e + 1] = t >>> 8,
            this[e + 2] = t >>> 16,
            this[e + 3] = t >>> 24) : j(this, t, e, !0),
          e + 4
      },
      u.prototype.writeInt32BE = function(t, e, r) {
        return t = +t,
          e |= 0,
          r || M(this, t, e, 4, 2147483647, -2147483648),
          t < 0 && (t = 4294967295 + t + 1),
          u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24,
            this[e + 1] = t >>> 16,
            this[e + 2] = t >>> 8,
            this[e + 3] = 255 & t) : j(this, t, e, !1),
          e + 4
      },
      u.prototype.writeFloatLE = function(t, e, r) {
        return k(this, t, e, !0, r)
      },
      u.prototype.writeFloatBE = function(t, e, r) {
        return k(this, t, e, !1, r)
      },
      u.prototype.writeDoubleLE = function(t, e, r) {
        return F(this, t, e, !0, r)
      },
      u.prototype.writeDoubleBE = function(t, e, r) {
        return F(this, t, e, !1, r)
      },
      u.prototype.copy = function(t, e, r, n) {
        if (r || (r = 0),
          n || 0 === n || (n = this.length),
          e >= t.length && (e = t.length),
          e || (e = 0),
          n > 0 && n < r && (n = r),
          n === r)
          return 0;
        if (0 === t.length || 0 === this.length)
          return 0;
        if (e < 0)
          throw new RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (n < 0)
          throw new RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length),
          t.length - e < n - r && (n = t.length - e + r);
        var o, i = n - r;
        if (this === t && r < e && e < n)
          for (o = i - 1; o >= 0; --o)
            t[o + e] = this[o + r];
        else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT)
          for (o = 0; o < i; ++o)
            t[o + e] = this[o + r];
        else
          Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
        return i
      },
      u.prototype.fill = function(t, e, r, n) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (n = e,
              e = 0,
              r = this.length) : "string" == typeof r && (n = r,
              r = this.length),
            1 === t.length) {
            var o = t.charCodeAt(0);
            o < 256 && (t = o)
          }
          if (void 0 !== n && "string" != typeof n)
            throw new TypeError("encoding must be a string");
          if ("string" == typeof n && !u.isEncoding(n))
            throw new TypeError("Unknown encoding: " + n)
        } else
          "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < r)
          throw new RangeError("Out of range index");
        if (r <= e)
          return this;
        e >>>= 0,
          r = void 0 === r ? this.length : r >>> 0,
          t || (t = 0);
        var i;
        if ("number" == typeof t)
          for (i = e; i < r; ++i)
            this[i] = t;
        else {
          var s = u.isBuffer(t) ? t : J(new u(t, n).toString()),
            f = s.length;
          for (i = 0; i < r - e; ++i)
            this[i + e] = s[i % f]
        }
        return this
      };
    var et = /[^+\/0-9A-Za-z-_]/g
  }).call(e, function() {
    return this
  }())
}, function(t, e) {
  "use strict";

  function r(t) {
    var e = t.length;
    if (e % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
  }

  function n(t) {
    return 3 * t.length / 4 - r(t)
  }

  function o(t) {
    var e, n, o, i, u, s, f = t.length;
    u = r(t),
      s = new h(3 * f / 4 - u),
      o = u > 0 ? f - 4 : f;
    var c = 0;
    for (e = 0,
      n = 0; e < o; e += 4,
      n += 3)
      i = a[t.charCodeAt(e)] << 18 | a[t.charCodeAt(e + 1)] << 12 | a[t.charCodeAt(e + 2)] << 6 | a[t.charCodeAt(e + 3)],
      s[c++] = i >> 16 & 255,
      s[c++] = i >> 8 & 255,
      s[c++] = 255 & i;
    return 2 === u ? (i = a[t.charCodeAt(e)] << 2 | a[t.charCodeAt(e + 1)] >> 4,
        s[c++] = 255 & i) : 1 === u && (i = a[t.charCodeAt(e)] << 10 | a[t.charCodeAt(e + 1)] << 4 | a[t.charCodeAt(e + 2)] >> 2,
        s[c++] = i >> 8 & 255,
        s[c++] = 255 & i),
      s
  }

  function i(t) {
    return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
  }

  function u(t, e, r) {
    for (var n, o = [], u = e; u < r; u += 3)
      n = (t[u] << 16) + (t[u + 1] << 8) + t[u + 2],
      o.push(i(n));
    return o.join("")
  }

  function s(t) {
    for (var e, r = t.length, n = r % 3, o = "", i = [], s = 16383, a = 0, h = r - n; a < h; a += s)
      i.push(u(t, a, a + s > h ? h : a + s));
    return 1 === n ? (e = t[r - 1],
        o += f[e >> 2],
        o += f[e << 4 & 63],
        o += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1],
        o += f[e >> 10],
        o += f[e >> 4 & 63],
        o += f[e << 2 & 63],
        o += "="),
      i.push(o),
      i.join("")
  }
  e.byteLength = n,
    e.toByteArray = o,
    e.fromByteArray = s;
  for (var f = [], a = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", l = 0, p = c.length; l < p; ++l)
    f[l] = c[l],
    a[c.charCodeAt(l)] = l;
  a["-".charCodeAt(0)] = 62,
    a["_".charCodeAt(0)] = 63
}, function(t, e) {
  e.read = function(t, e, r, n, o) {
      var i, u, s = 8 * o - n - 1,
        f = (1 << s) - 1,
        a = f >> 1,
        h = -7,
        c = r ? o - 1 : 0,
        l = r ? -1 : 1,
        p = t[e + c];
      for (c += l,
        i = p & (1 << -h) - 1,
        p >>= -h,
        h += s; h > 0; i = 256 * i + t[e + c],
        c += l,
        h -= 8)
      ;
      for (u = i & (1 << -h) - 1,
        i >>= -h,
        h += n; h > 0; u = 256 * u + t[e + c],
        c += l,
        h -= 8)
      ;
      if (0 === i)
        i = 1 - a;
      else {
        if (i === f)
          return u ? NaN : (p ? -1 : 1) * (1 / 0);
        u += Math.pow(2, n),
          i -= a
      }
      return (p ? -1 : 1) * u * Math.pow(2, i - n)
    },
    e.write = function(t, e, r, n, o, i) {
      var u, s, f, a = 8 * i - o - 1,
        h = (1 << a) - 1,
        c = h >> 1,
        l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = n ? 0 : i - 1,
        g = n ? 1 : -1,
        y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e),
        isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0,
          u = h) : (u = Math.floor(Math.log(e) / Math.LN2),
          e * (f = Math.pow(2, -u)) < 1 && (u--,
            f *= 2),
          e += u + c >= 1 ? l / f : l * Math.pow(2, 1 - c),
          e * f >= 2 && (u++,
            f /= 2),
          u + c >= h ? (s = 0,
            u = h) : u + c >= 1 ? (s = (e * f - 1) * Math.pow(2, o),
            u += c) : (s = e * Math.pow(2, c - 1) * Math.pow(2, o),
            u = 0)); o >= 8; t[r + p] = 255 & s,
        p += g,
        s /= 256,
        o -= 8)
      ;
      for (u = u << o | s,
        a += o; a > 0; t[r + p] = 255 & u,
        p += g,
        u /= 256,
        a -= 8)
      ;
      t[r + p - g] |= 128 * y
    }
}, function(t, e) {
  t.exports = Array.isArray || function(t) {
    return "[object Array]" == Object.prototype.toString.call(t)
  }
}]);
//# sourceMappingURL=__sw.js.map