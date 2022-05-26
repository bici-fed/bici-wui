'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

require('antd/es/button/style');

var _button = _interopRequireDefault(require('antd/es/button'));

require('antd/es/config-provider/style');

var _configProvider = _interopRequireDefault(require('antd/es/config-provider'));

var _react = _interopRequireWildcard(require('react'));

require('./index.less');

/**
 *
 * @returns 我们要求覆盖 antd 的样式必须要使用 .@{ant-prefix} 变量来生成类名，在 js 中使用如下代码来配置实现。
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${包名}');
 */
var Button = function Button() {
  var _useContext = (0, _react.useContext)(_configProvider.default.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;

  var className = getPrefixCls('bici-wui-button');
  return /*#__PURE__*/ _react.default.createElement(
    _button.default,
    {
      type: 'primary',
      className: className,
    },
    '\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE',
  );
};

var _default = Button;
exports.default = _default;
