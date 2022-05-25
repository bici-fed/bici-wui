'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _BaseRequest = require('./BaseRequest');

Object.keys(_BaseRequest).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _BaseRequest[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseRequest[key];
    },
  });
});
