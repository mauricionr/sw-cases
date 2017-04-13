(function(B) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = B()
  } else {
    if (typeof define === "function" && define.amd) {
      define([], B)
    } else {
      var A;
      if (typeof window !== "undefined") {
        A = window
      } else {
        if (typeof global !== "undefined") {
          A = global
        } else {
          if (typeof self !== "undefined") {
            A = self
          } else {
            A = this
          }
        }
      }
      A.toolbox = B()
    }
  }
})(function() {
  var D, B, A;
  return (function C(F, J, H) {
    function G(O, M) {
      if (!J[O]) {
        if (!F[O]) {
          var L = typeof require == "function" && require;
          if (!M && L) {
            return L(O, !0)
          }
          if (E) {
            return E(O, !0)
          }
          var N = new Error("Cannot find module '" + O + "'");
          throw N.code = "MODULE_NOT_FOUND",
            N
        }
        var K = J[O] = {
          exports: {}
        };
        F[O][0].call(K.exports, function(P) {
          var Q = F[O][1][P];
          return G(Q ? Q : P)
        }, K, K.exports, C, F, J, H)
      }
      return J[O].exports
    }
    var E = typeof require == "function" && require;
    for (var I = 0; I < H.length; I++) {
      G(H[I])
    }
    return G
  })({
    1: [function(J, G, K) {
      function E(R, S) {
        S = S || {};
        var Q = S.debug || N.debug;
        Q && console.log("[sw-toolbox] " + R)
      }

      function H(Q) {
        var R;
        return Q && Q.cache && (R = Q.cache.name),
          R = R || N.cache.name,
          caches.open(R)
      }

      function M(R, S) {
        S = S || {};
        var Q = S.successResponses || N.successResponses;
        return fetch(R.clone()).then(function(T) {
          return "GET" === R.method && Q.test(T.status) && H(S).then(function(U) {
              U.put(R, T).then(function() {
                var V = S.cache || N.cache;
                (V.maxEntries || V.maxAgeSeconds) && V.name && I(R, U, V)
              })
            }),
            T.clone()
        })
      }

      function I(R, T, Q) {
        var S = P.bind(null, R, T, Q);
        F = F ? F.then(S) : S()
      }

      function P(U, X, S) {
        var W = U.url,
          Q = S.maxAgeSeconds,
          R = S.maxEntries,
          V = S.name,
          T = Date.now();
        return E("Updating LRU order for " + W + ". Max entries is " + R + ", max age is " + Q),
          L.getDb(V).then(function(Y) {
            return L.setTimestampForUrl(Y, W, T)
          }).then(function(Y) {
            return L.expireEntries(Y, R, Q, T)
          }).then(function(Z) {
            E("Successfully updated IDB.");
            var Y = Z.map(function(a) {
              return X["delete"](a)
            });
            return Promise.all(Y).then(function() {
              E("Done with cache cleanup.")
            })
          })["catch"](function(Y) {
            E(Y)
          })
      }

      function O(R, S, Q) {
        return E("Renaming cache: [" + R + "] to [" + S + "]", Q),
          caches["delete"](S).then(function() {
            return Promise.all([caches.open(R), caches.open(S)]).then(function(V) {
              var T = V[0],
                U = V[1];
              return T.keys().then(function(W) {
                return Promise.all(W.map(function(X) {
                  return T.match(X).then(function(Y) {
                    return U.put(X, Y)
                  })
                }))
              }).then(function() {
                return caches["delete"](R)
              })
            })
          })
      }
      var N = J("./options"),
        L = J("./idb-cache-expiration"),
        F;
      G.exports = {
        debug: E,
        fetchAndCache: M,
        openCache: H,
        renameCache: O
      }
    }, {
      "./idb-cache-expiration": 2,
      "./options": 3
    }],
    2: [function(J, H, L) {
      function R(T) {
        return new Promise(function(V, W) {
          var U = indexedDB.open(M + T, K);
          U.onupgradeneeded = function() {
              var X = U.result.createObjectStore(O, {
                keyPath: I
              });
              X.createIndex(G, G, {
                unique: !1
              })
            },
            U.onsuccess = function() {
              V(U.result)
            },
            U.onerror = function() {
              W(U.error)
            }
        })
      }

      function S(T) {
        return T in E || (E[T] = R(T)),
          E[T]
      }

      function N(U, T, V) {
        return new Promise(function(Y, Z) {
          var X = U.transaction(O, "readwrite"),
            W = X.objectStore(O);
          W.put({
              url: T,
              timestamp: V
            }),
            X.oncomplete = function() {
              Y(U)
            },
            X.onabort = function() {
              Z(X.error)
            }
        })
      }

      function Q(U, T, V) {
        return T ? new Promise(function(Z, d) {
          var Y = 1000 * T,
            X = [],
            e = U.transaction(O, "readwrite"),
            b = e.objectStore(O),
            W = b.index(G);
          W.openCursor().onsuccess = function(f) {
              var c = f.target.result;
              if (c && V - Y > c.value[G]) {
                var a = c.value[I];
                X.push(a),
                  b["delete"](a),
                  c["continue"]()
              }
            },
            e.oncomplete = function() {
              Z(X)
            },
            e.onabort = d
        }) : Promise.resolve([])
      }

      function P(U, T) {
        return T ? new Promise(function(b, X) {
          var Z = [],
            W = U.transaction(O, "readwrite"),
            V = W.objectStore(O),
            a = V.index(G),
            Y = a.count();
          a.count().onsuccess = function() {
              var c = Y.result;
              c > T && (a.openCursor().onsuccess = function(f) {
                var e = f.target.result;
                if (e) {
                  var d = e.value[I];
                  Z.push(d),
                    V["delete"](d),
                    c - Z.length > T && e["continue"]()
                }
              })
            },
            W.oncomplete = function() {
              b(Z)
            },
            W.onabort = X
        }) : Promise.resolve([])
      }

      function F(V, U, W, T) {
        return Q(V, W, T).then(function(X) {
          return P(V, U).then(function(Y) {
            return X.concat(Y)
          })
        })
      }
      var M = "sw-toolbox-",
        K = 1,
        O = "store",
        I = "url",
        G = "timestamp",
        E = {};
      H.exports = {
        getDb: S,
        setTimestampForUrl: N,
        expireEntries: F
      }
    }, {}],
    3: [function(F, G, E) {
      var H;
      H = self.registration ? self.registration.scope : self.scope || new URL("./", self.location).href,
        G.exports = {
          cache: {
            name: "$$$toolbox-cache$$$" + H + "$$$",
            maxAgeSeconds: null,
            maxEntries: null
          },
          debug: !1,
          networkTimeoutSeconds: null,
          preCacheItems: [],
          successResponses: /^0|([123]\d\d)|(40[14567])|410$/
        }
    }, {}],
    4: [function(G, H, E) {
      var F = new URL("./", self.location),
        K = F.pathname,
        I = G("path-to-regexp"),
        J = function(O, M, L, N) {
          M instanceof RegExp ? this.fullUrlRegExp = M : (0 !== M.indexOf("/") && (M = K + M),
              this.keys = [],
              this.regexp = I(M, this.keys)),
            this.method = O,
            this.options = N,
            this.handler = L
        };
      J.prototype.makeHandler = function(N) {
          var M;
          if (this.regexp) {
            var L = this.regexp.exec(N);
            M = {},
              this.keys.forEach(function(P, O) {
                M[P.name] = L[O + 1]
              })
          }
          return function(O) {
              return this.handler(O, M, this.options)
            }
            .bind(this)
        },
        H.exports = J
    }, {
      "path-to-regexp": 13
    }],
    5: [function(G, J, F) {
      function I(L) {
        return L.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
      }
      var K = G("./route"),
        H = function(O, M) {
          for (var N = O.entries(), P = N.next(), Q = []; !P.done;) {
            var L = new RegExp(P.value[0]);
            L.test(M) && Q.push(P.value[1]),
              P = N.next()
          }
          return Q
        },
        E = function() {
          this.routes = new Map,
            this["default"] = null
        };
      ["get", "post", "put", "delete", "head", "any"].forEach(function(L) {
          E.prototype[L] = function(M, N, O) {
            return this.add(L, M, N, O)
          }
        }),
        E.prototype.add = function(P, S, L, M) {
          M = M || {};
          var N;
          S instanceof RegExp ? N = RegExp : (N = M.origin || self.location.origin,
              N = N instanceof RegExp ? N.source : I(N)),
            P = P.toLowerCase();
          var R = new K(P, S, L, M);
          this.routes.has(N) || this.routes.set(N, new Map);
          var Q = this.routes.get(N);
          Q.has(P) || Q.set(P, new Map);
          var T = Q.get(P),
            O = R.regexp || R.fullUrlRegExp;
          T.set(O.source, R)
        },
        E.prototype.matchMethod = function(N, L) {
          var M = new URL(L),
            O = M.origin,
            P = M.pathname;
          return this._match(N, H(this.routes, O), P) || this._match(N, [this.routes.get(RegExp)], L)
        },
        E.prototype._match = function(P, N, O) {
          if (0 === N.length) {
            return null
          }
          for (var Q = 0; Q < N.length; Q++) {
            var R = N[Q],
              M = R && R.get(P.toLowerCase());
            if (M) {
              var L = H(M, O);
              if (L.length > 0) {
                return L[0].makeHandler(O)
              }
            }
          }
          return null
        },
        E.prototype.match = function(L) {
          return this.matchMethod(L.method, L.url) || this.matchMethod("any", L.url)
        },
        J.exports = new E
    }, {
      "./route": 4
    }],
    6: [function(G, H, F) {
      function E(L, K, J) {
        return I.debug("Strategy: cache first [" + L.url + "]", J),
          I.openCache(J).then(function(M) {
            return M.match(L).then(function(N) {
              return N ? N : I.fetchAndCache(L, J)
            })
          })
      }
      var I = G("../helpers");
      H.exports = E
    }, {
      "../helpers": 1
    }],
    7: [function(F, G, E) {
      function I(K, J, L) {
        return H.debug("Strategy: cache only [" + K.url + "]", L),
          H.openCache(L).then(function(M) {
            return M.match(K)
          })
      }
      var H = F("../helpers");
      G.exports = I
    }, {
      "../helpers": 1
    }],
    8: [function(G, H, F) {
      function E(L, M, K) {
        return I.debug("Strategy: fastest [" + L.url + "]", K),
          new Promise(function(Q, P) {
            var S = !1,
              R = [],
              N = function(T) {
                R.push(T.toString()),
                  S ? P(new Error('Both cache and network failed: "' + R.join('", "') + '"')) : S = !0
              },
              O = function(T) {
                T instanceof Response ? Q(T) : N("No result returned")
              };
            I.fetchAndCache(L.clone(), K).then(O, N),
              J(L, M, K).then(O, N)
          })
      }
      var I = G("../helpers"),
        J = G("./cacheOnly");
      H.exports = E
    }, {
      "../helpers": 1,
      "./cacheOnly": 7
    }],
    9: [function(F, G, E) {
      G.exports = {
        networkOnly: F("./networkOnly"),
        networkFirst: F("./networkFirst"),
        cacheOnly: F("./cacheOnly"),
        cacheFirst: F("./cacheFirst"),
        fastest: F("./fastest")
      }
    }, {
      "./cacheFirst": 6,
      "./cacheOnly": 7,
      "./fastest": 8,
      "./networkFirst": 10,
      "./networkOnly": 11
    }],
    10: [function(G, H, F) {
      function E(N, M, K) {
        K = K || {};
        var L = K.successResponses || J.successResponses,
          O = K.networkTimeoutSeconds || J.networkTimeoutSeconds;
        return I.debug("Strategy: network first [" + N.url + "]", K),
          I.openCache(K).then(function(S) {
            var T, Q, R = [];
            if (O) {
              var U = new Promise(function(V) {
                T = setTimeout(function() {
                  S.match(N).then(function(W) {
                    W && V(W)
                  })
                }, 1000 * O)
              });
              R.push(U)
            }
            var P = I.fetchAndCache(N, K).then(function(V) {
              if (T && clearTimeout(T),
                L.test(V.status)) {
                return V
              }
              throw I.debug("Response was an HTTP error: " + V.statusText, K),
                Q = V,
                new Error("Bad response")
            })["catch"](function(V) {
              return I.debug("Network or response error, fallback to cache [" + N.url + "]", K),
                S.match(N).then(function(W) {
                  if (W) {
                    return W
                  }
                  if (Q) {
                    return Q
                  }
                  throw V
                })
            });
            return R.push(P),
              Promise.race(R)
          })
      }
      var J = G("../options"),
        I = G("../helpers");
      H.exports = E
    }, {
      "../helpers": 1,
      "../options": 3
    }],
    11: [function(G, H, E) {
      function F(L, K, J) {
        return I.debug("Strategy: network only [" + L.url + "]", J),
          fetch(L)
      }
      var I = G("../helpers");
      H.exports = F
    }, {
      "../helpers": 1
    }],
    12: [function(J, H, M) {
      function F(R, Q) {
        return G.openCache(Q).then(function(S) {
          return S.add(R)
        })
      }

      function I(R, Q) {
        return G.openCache(Q).then(function(S) {
          return S["delete"](R)
        })
      }

      function N(Q) {
        Q instanceof Promise || K(Q),
          P.preCacheItems = P.preCacheItems.concat(Q)
      }
      J("serviceworker-cache-polyfill");
      var P = J("./options"),
        O = J("./router"),
        G = J("./helpers"),
        L = J("./strategies");
      G.debug("Service Worker Toolbox is loading");
      var E = function(Q) {
          return Q.reduce(function(S, R) {
            return S.concat(R)
          }, [])
        },
        K = function(R) {
          var Q = Array.isArray(R);
          if (Q && R.forEach(function(S) {
              "string" == typeof S || S instanceof Request || (Q = !1)
            }), !Q) {
            throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.")
          }
          return R
        };
      self.addEventListener("install", function(R) {
          var Q = P.cache.name + "$$$inactive$$$";
          G.debug("install event fired"),
            G.debug("creating cache [" + Q + "]"),
            R.waitUntil(G.openCache({
              cache: {
                name: Q
              }
            }).then(function(S) {
              return Promise.all(P.preCacheItems).then(E).then(K).then(function(T) {
                return G.debug("preCache list: " + (T.join(", ") || "(none)")),
                  S.addAll(T)
              })
            }))
        }),
        self.addEventListener("activate", function(R) {
          G.debug("activate event fired");
          var Q = P.cache.name + "$$$inactive$$$";
          R.waitUntil(G.renameCache(Q, P.cache.name))
        }),
        self.addEventListener("fetch", function(R) {
          var Q = O.match(R.request);
          Q ? R.respondWith(Q(R.request)) : O["default"] && "GET" === R.request.method && R.respondWith(O["default"](R.request))
        }),
        H.exports = {
          networkOnly: L.networkOnly,
          networkFirst: L.networkFirst,
          cacheOnly: L.cacheOnly,
          cacheFirst: L.cacheFirst,
          fastest: L.fastest,
          router: O,
          options: P,
          cache: F,
          uncache: I,
          precache: N
        }
    }, {
      "./helpers": 1,
      "./options": 3,
      "./router": 5,
      "./strategies": 9,
      "serviceworker-cache-polyfill": 15
    }],
    13: [function(J, F, N) {
      function M(AD) {
        for (var Z, d = [], q = 0, k = 0, j = ""; null != (Z = K.exec(AD));) {
          var AF = Z[0],
            z = Z[1],
            b = Z.index;
          if (j += AD.slice(k, b),
            k = b + AF.length,
            z) {
            j += z[1]
          } else {
            j && (d.push(j),
              j = "");
            var Y = Z[2],
              AE = Z[3],
              w = Z[4],
              AC = Z[5],
              AB = Z[6],
              X = Z[7],
              AA = "+" === AB || "*" === AB,
              v = "?" === AB || "*" === AB,
              W = Y || "/",
              V = w || AC || (X ? ".*" : "[^" + W + "]+?");
            d.push({
              name: AE || q++,
              prefix: Y || "",
              delimiter: W,
              optional: v,
              repeat: AA,
              pattern: S(V)
            })
          }
        }
        return k < AD.length && (j += AD.substr(k)),
          j && d.push(j),
          d
      }

      function U(V) {
        return P(M(V))
      }

      function P(X) {
        for (var V = new Array(X.length), W = 0; W < X.length; W++) {
          "object" == typeof X[W] && (V[W] = new RegExp("^" + X[W].pattern + "$"))
        }
        return function(d) {
          for (var g = "", f = d || {}, e = 0; e < X.length; e++) {
            var Y = X[e];
            if ("string" != typeof Y) {
              var b, c = f[Y.name];
              if (null == c) {
                if (Y.optional) {
                  continue
                }
                throw new TypeError('Expected "' + Y.name + '" to be defined')
              }
              if (R(c)) {
                if (!Y.repeat) {
                  throw new TypeError('Expected "' + Y.name + '" to not repeat, but received "' + c + '"')
                }
                if (0 === c.length) {
                  if (Y.optional) {
                    continue
                  }
                  throw new TypeError('Expected "' + Y.name + '" to not be empty')
                }
                for (var Z = 0; Z < c.length; Z++) {
                  if (b = encodeURIComponent(c[Z]), !V[e].test(b)) {
                    throw new TypeError('Expected all "' + Y.name + '" to match "' + Y.pattern + '", but received "' + b + '"')
                  }
                  g += (0 === Z ? Y.prefix : Y.delimiter) + b
                }
              } else {
                if (b = encodeURIComponent(c), !V[e].test(b)) {
                  throw new TypeError('Expected "' + Y.name + '" to match "' + Y.pattern + '", but received "' + b + '"')
                }
                g += Y.prefix + b
              }
            } else {
              g += Y
            }
          }
          return g
        }
      }

      function H(V) {
        return V.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1")
      }

      function S(V) {
        return V.replace(/([=!:$\/()])/g, "\\$1")
      }

      function Q(W, V) {
        return W.keys = V,
          W
      }

      function G(V) {
        return V.sensitive ? "" : "i"
      }

      function I(X, V) {
        var W = X.source.match(/\((?!\?)/g);
        if (W) {
          for (var Y = 0; Y < W.length; Y++) {
            V.push({
              name: Y,
              prefix: null,
              delimiter: null,
              optional: !1,
              repeat: !1,
              pattern: null
            })
          }
        }
        return Q(X, V)
      }

      function E(Y, V, W) {
        for (var a = [], Z = 0; Z < Y.length; Z++) {
          a.push(L(Y[Z], V, W).source)
        }
        var X = new RegExp("(?:" + a.join("|") + ")", G(W));
        return Q(X, V)
      }

      function O(Y, V, W) {
        for (var a = M(Y), Z = T(a, W), X = 0; X < a.length; X++) {
          "string" != typeof a[X] && V.push(a[X])
        }
        return Q(Z, V)
      }

      function T(b, h) {
        h = h || {};
        for (var V = h.strict, Y = h.end !== !1, X = "", W = b[b.length - 1], f = "string" == typeof W && /\/$/.test(W), Z = 0; Z < b.length; Z++) {
          var j = b[Z];
          if ("string" == typeof j) {
            X += H(j)
          } else {
            var g = H(j.prefix),
              d = j.pattern;
            j.repeat && (d += "(?:" + g + d + ")*"),
              d = j.optional ? g ? "(?:" + g + "(" + d + "))?" : "(" + d + ")?" : g + "(" + d + ")",
              X += d
          }
        }
        return V || (X = (f ? X.slice(0, -2) : X) + "(?:\\/(?=$))?"),
          X += Y ? "$" : V && f ? "" : "(?=\\/|$)",
          new RegExp("^" + X, G(h))
      }

      function L(X, V, W) {
        return V = V || [],
          R(V) ? W || (W = {}) : (W = V,
            V = []),
          X instanceof RegExp ? I(X, V, W) : R(X) ? E(X, V, W) : O(X, V, W)
      }
      var R = J("isarray");
      F.exports = L,
        F.exports.parse = M,
        F.exports.compile = U,
        F.exports.tokensToFunction = P,
        F.exports.tokensToRegExp = T;
      var K = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"), "g")
    }, {
      isarray: 14
    }],
    14: [function(F, G, E) {
      G.exports = Array.isArray || function(H) {
        return "[object Array]" == Object.prototype.toString.call(H)
      }
    }, {}],
    15: [function(F, G, E) {
      Cache.prototype.addAll || (Cache.prototype.addAll = function(H) {
        function J(K) {
          this.name = "NetworkError",
            this.code = 19,
            this.message = K
        }
        var I = this;
        return J.prototype = Object.create(Error.prototype),
          Promise.resolve().then(function() {
            if (arguments.length < 1) {
              throw new TypeError
            }
            return H = H.map(function(K) {
                return K instanceof Request ? K : String(K)
              }),
              Promise.all(H.map(function(K) {
                "string" == typeof K && (K = new Request(K));
                var L = new URL(K.url).protocol;
                if ("http:" !== L && "https:" !== L) {
                  throw new J("Invalid scheme")
                }
                return fetch(K.clone())
              }))
          }).then(function(K) {
            return Promise.all(K.map(function(L, M) {
              return I.put(H[M], L)
            }))
          }).then(function() {})
      })
    }, {}]
  }, {}, [12])(12)
});

function checkUrlRegexInMap(A, B) {
  isPresent = false;
  for (i = 0; i < B.length; i++) {
    if (A.indexOf(B[i]) > -1 && A.indexOf("google-analytics.com") <= -1 && A.indexOf("stats.g.doubleclick.net") <= -1 && A.indexOf("b.scorecardresearch.com") <= -1) {
      isPresent = true;
      break
    }
  }
  return isPresent
}
(function() {
  var N = "/localhost/";
  var O = "v23";
  var J = "mb-staticIndef-" + O;
  var P = "mb-static-" + O;
  var D = "mb-webService-" + O;
  var c = "mb_html-" + O;
  var Z = "mb_htmlDet-" + O;
  var I = "mb_htmlPropSRP-" + O;
  var Q = "mb_htmlProjSRP-" + O;
  var U = "mb_htmlProjDetail-" + O;
  var C = "";
  var T = "staticmb.com";
  var E = "offline.html";
  var F = "offlineHome.html";
  var G = [J, P, D, c, Z, I, Q, U];
  var A = ["index.html", "property-for-sale/residential-real-estate", "property-for-rent/residential-real-estate"];
  var a = ["mobKeywordAutoSuggest.html", "popularAutoSuggest.html", "androidAppBannerAjax.html"];
  var K = [C + "/js/jqueryHomeGlobal.group.js", C + "/js/propertyoasd.js", C + "/css/homeStyle.css"];
  var R = 4;
  var M = 5;
  self.addEventListener("install", function(e) {
    e.waitUntil(caches.open(J).then(function(f) {
      return f.addAll([E])
    }).then(function() {
      console.log("[ServiceWorker] Skip waiting on install  ******  check");
      self.skipWaiting()
    }))
  });
  self.addEventListener("activate", function(e) {
    e.waitUntil(caches.keys().then(function(f) {
      return Promise.all(f.map(function(g) {
        if (G.indexOf(g) === -1) {
          return caches["delete"](g)
        }
      }))
    }).then(function() {
      console.log("delete activation");
      return self.clients.claim()
    }))
  });
  toolbox.router.get(/\/(index.html)/i, H, {
    cache: {
      name: c,
      maxEntries: 6,
      maxAgeSeconds: 604800
    }
  });
  toolbox.router.get(/\/((property-for-sale*((?!(parameter=|filter=)).)*$)|(property-for-rent*((?!(parameter=|filter=)).)*$))/i, S, {
    cache: {
      name: I,
      maxEntries: 2,
      maxAgeSeconds: 604800
    }
  });
  toolbox.router.get(/\/((propertyDetails-*((?!(png)).)*$)|loadContact.html)/i, S, {
    cache: {
      name: Z,
      maxEntries: 9,
      maxAgeSeconds: 604800
    }
  });
  toolbox.router.get(/\/(jqueryHomeGlobal.group.js|jquery.lazyload.min.js|blank.gif|propertyResultoasd.js|propertyoasd.js|homeStyle.css|mobileStyle.css|ntracking.js|mobilePropertySRP-B.css|mobilePropertySRP-C.css|property-detail.css|mobileHeaderFooter.css|property-detail.js|contactFormValidation.group.js|common-contactB.js|contact.js|spriteNavigationIcons.png|noImage_propertyB.png|mobileFilter.css|ajax-loader.gif|mobileResponsive.css)/i, toolbox.cacheFirst, {
    cache: {
      name: P,
      maxEntries: 21,
      maxAgeSeconds: 604800
    },
  });
  toolbox.router.get(/\/(mobKeywordAutoSuggest.html|popularAutoSuggest.html|androidAppBannerAjax.html)/i, toolbox.cacheFirst, {
    cache: {
      name: D,
      maxEntries: 8,
      maxAgeSeconds: 604800
    },
  });
  toolbox.router.get(/\/(residential-new-project|projectdetail-|savedSearch.html|contactedProperty.html|savedProperty.html|myMagicBox.html|localitySearch.html|home-loan-calculator-financial-advice|login.html|userListings.html|real-estate-property-reviews|localityDetail.html|project-detail)/i, d);
  self.addEventListener("message", function(f) {
    var e;
    caches.open(P).then(function(g) {
      if (!g) {
        f.ports[0].postMessage({
          error: "no cache defineed"
        })
      }
      switch (f.data.command) {
        case "add":
          e = new Request(f.data.url, {
            mode: "no-cors"
          });
          g.add(e).then(function() {
            console.log("recived url in service worker" + f.data.url);
            f.ports[0].postMessage({
              error: null
            })
          });
          break;
        case "delete":
          e = new Request(f.data.url);
          g["delete"](e).then(function(h) {
            f.ports[0].postMessage({
              error: h ? null : "Item was not found in the cache."
            })
          });
          break;
        default:
          throw Error("Unknown command: " + f.data.command)
      }
    })["catch"](function(g) {
      console.error("Message handling failed:", g);
      f.ports[0].postMessage({
        error: g.toString()
      })
    })
  });

  function Y(e) {
    if (self.clients) {
      self.clients.matchAll().then(function(f) {
        Promise.all(f.map(function(g) {
          g.postMessage("offline")
        }))
      })
    }
  }

  function B(g, f, h, e) {
    Promise.all([g.keys().then(function(k) {
      var j = false;
      k.forEach(function(l) {
        if (l.url === h.url) {
          j = true
        }
      });
      if (!j && k.length < f) {
        j = true
      }
      if (j) {
        g.put(h, e)
      }
    })])
  }
  self.addEventListener("push", function(e) {
    console.log("Push message received", e);
    if (self.Notification.permission == "granted") {
      if (e.data) {
        var f = e.data.json();
        V(f, e)
      } else {
        b(e)
      }
    } else {
      self.Notification.requestPermission(function(g) {
        if (g == "granted") {
          if (e.data) {
            var h = e.data.json();
            V(h, e)
          } else {
            b(e)
          }
        }
      })
    }
  });
  self.addEventListener("notificationclick", function(f) {
    console.log("On notification click: ", f.notification.tag);
    f.notification.close();
    var e = f.notification.data.url;
    if (!e) {
      return
    }
    f.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(j) {
      for (var h = 0; h < j.length; h++) {
        var g = j[h];
        if (g.url == e && "focus" in g) {
          return g.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(e)
      }
    }))
  });

  function b(e) {
    e.waitUntil(self.registration.pushManager.getSubscription().then(function(g) {
      if (g) {
        const f = g.endpoint.slice(g.endpoint.lastIndexOf("/") + 1);
        console.log("*********  subscription id in service worker: " + f);
        return self.registration.showNotification("2 bhk property", {
          body: "Property  notification",
          icon: "/image/fav1.png",
          tag: "Property for you",
          data: {
            url: "/mbs/property-for-sale/2-BHK-Flat-real-estate-Noida",
          }
        })
      }
    }))
  }

  function V(k, h) {
    var l = k.title;
    var f = k.body;
    var g = "https://mcdn.staticmb.com/image/fav1.png";
    var e = "mobile push";
    var j = {
      url: k.url
    };
    h.waitUntil(self.registration.showNotification(l, {
      body: f,
      icon: g,
      tag: e,
      data: j
    }))
  }

  function S(h, e, g) {
    var f = h.url;
    if (f.indexOf("criteo.com") > -1 || f.indexOf("google-analytics.com") > -1 || f.indexOf("stats.g.doubleclick.net") > -1 || f.indexOf("b.scorecardresearch.com") > -1 || f.indexOf("googleadservices.com") > -1) {
      return fetch(h).then(function(j) {
        return j
      })
    }
    return toolbox.networkFirst(h, e, g)["catch"](function(j) {
      if (h.method === "GET" && h.headers.get("accept").includes("text/html")) {
        return X(J, E)
      }
      throw j
    })
  }

  function H(h, e, g) {
    var f = h.url;
    if (f.indexOf("criteo.com") > -1 || f.indexOf("google-analytics.com") > -1 || f.indexOf("stats.g.doubleclick.net") > -1 || f.indexOf("b.scorecardresearch.com") > -1 || f.indexOf("googleadservices.com") > -1) {
      return fetch(h).then(function(j) {
        return j
      })
    }
    return toolbox.networkFirst(h, e, g)["catch"](function(j) {
      if (h.method === "GET" && h.headers.get("accept").includes("text/html")) {
        if (h.url.indexOf("index.html?utm_source=aths") > -1) {
          try {
            return L(c, "index.html")
          } catch (k) {
            return X(J, E)
          }
        } else {
          if (h.url.endsWith("/mbs/index.html")) {
            try {
              return L(c, "index.html?utm_source=aths")
            } catch (k) {
              return X(J, E)
            }
          } else {
            return X(J, E)
          }
        }
      }
      throw j
    })
  }

  function W(g, e, f) {
    return toolbox.cacheFirst(g, e, f)["catch"](function(h) {
      if (g.method === "GET" && g.headers.get("accept").includes("text/html")) {
        return X(J, E)
      }
      throw h
    })
  }

  function d(g, e, f) {
    return toolbox.networkOnly(g, e, f)["catch"](function(h) {
      if (g.method === "GET" && g.headers.get("accept").includes("text/html")) {
        return X(J, E)
      }
      throw h
    })
  }

  function X(g, f) {
    var e = new Request(f);
    return caches.open(g).then(function(h) {
      return h.match(e)
    })
  }

  function L(g, f) {
    var e = new Request(f);
    return caches.open(g).then(function(h) {
      return h.match(e).then(function(j) {
        if (j) {
          return j
        } else {
          return X(J, E)
        }
      })
    })
  }
})();