!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t(require('React')))
    : 'function' == typeof define && define.amd
    ? define(['React'], t)
    : 'object' == typeof exports
    ? (exports['ProBus-components'] = t(require('React')))
    : (e['ProBus-components'] = t(e.React));
})(this, (e) =>
  (() => {
    'use strict';
    var t = {
        437: (e, t, o) => {
          o.d(t, { Z: () => u });
          var r = o(24),
            n = o.n(r);
          const u = function (e) {
            var t = e.title;
            return n().createElement('h1', null, t);
          };
        },
        24: (t) => {
          t.exports = e;
        },
      },
      o = {};
    function r(e) {
      var n = o[e];
      if (void 0 !== n) return n.exports;
      var u = (o[e] = { exports: {} });
      return t[e](u, u.exports, r), u.exports;
    }
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
      (r.d = (e, t) => {
        for (var o in t)
          r.o(t, o) && !r.o(e, o) && Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
      }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      });
    var n = {};
    return (
      (() => {
        r.r(n), r.d(n, { Foo: () => e.Z });
        var e = r(437);
      })(),
      n
    );
  })(),
);
