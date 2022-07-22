'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _utils = require('@bici-wui/utils');

Object.keys(_utils).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    },
  });
});

var _antx = require('@bici-wui/antx');

Object.keys(_antx).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _antx[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _antx[key];
    },
  });
});

var _busComponents = require('@bici-wui/bus-components');

Object.keys(_busComponents).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _busComponents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _busComponents[key];
    },
  });
});

var _version = require('./version');

Object.keys(_version).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (key in exports && exports[key] === _version[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _version[key];
    },
  });
});
