'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var _exportNames = {
  Foo: true,
  Modal: true,
  Button: true,
  Upload: true,
};
Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function get() {
    return _Button.default;
  },
});
Object.defineProperty(exports, 'Foo', {
  enumerable: true,
  get: function get() {
    return _Foo.default;
  },
});
Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function get() {
    return _Modal.default;
  },
});
Object.defineProperty(exports, 'Upload', {
  enumerable: true,
  get: function get() {
    return _Upload.default;
  },
});

var _Foo = _interopRequireDefault(require('./Foo'));

var _Modal = _interopRequireDefault(require('./Modal'));

var _Button = _interopRequireDefault(require('./Button'));

var _Upload = _interopRequireWildcard(require('./Upload'));

Object.keys(_Upload).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Upload[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Upload[key];
    },
  });
});
