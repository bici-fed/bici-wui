"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/es/config-provider/style");

var _configProvider = _interopRequireDefault(require("antd/es/config-provider"));

require("antd/es/tabs/style");

var _tabs = _interopRequireDefault(require("antd/es/tabs"));

var _jsxRuntime = require("react/jsx-runtime");

var _react = _interopRequireWildcard(require("react"));

var _classnames3 = _interopRequireDefault(require("classnames"));

require("./index.less");

var _excluded = ["width", "minWidth", "maxWidth", "contentClassName", "tabBarGutter", "onChange", "activeKey"];
var TabPane = _tabs.default.TabPane;

function WuiTabs(props) {
  var _useContext = (0, _react.useContext)(_configProvider.default.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefix = getPrefixCls('wui', 'mart-wui');

  _configProvider.default.config({
    prefixCls: 'bic'
  });

  var width = props.width,
      minWidth = props.minWidth,
      maxWidth = props.maxWidth,
      contentClassName = props.contentClassName,
      _props$tabBarGutter = props.tabBarGutter,
      tabBarGutter = _props$tabBarGutter === void 0 ? 2 : _props$tabBarGutter,
      onChange = props.onChange,
      activeKey = props.activeKey,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded); // 重写tab

  var renderTabBar = function renderTabBar(tabBarProps, DefaultTabBar) {
    var activeKey = tabBarProps.activeKey,
        panes = tabBarProps.panes,
        _tabBarProps$tabBarGu = tabBarProps.tabBarGutter,
        tabBarGutter = _tabBarProps$tabBarGu === void 0 ? 0 : _tabBarProps$tabBarGu;
    var first = panes === null || panes === void 0 ? void 0 : panes[0]; // @ts-ignore

    var last = panes === null || panes === void 0 ? void 0 : panes[panes.length - 1];
    return (0, _jsxRuntime.jsx)(_configProvider.default, {
      prefixCls: "mart",
      children: (0, _jsxRuntime.jsx)(DefaultTabBar, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tabBarProps), {}, {
        children: function children(node) {
          var _classnames;

          var tabClass = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-tab"), true), (0, _defineProperty2.default)(_classnames, "".concat(prefix, "-tab-active"), node.key === activeKey), _classnames));
          var isFirst = first.key === node.key;
          var isLast = last.key === node.key;
          var newWidth = width || maxWidth || minWidth;
          var newStyle = {
            width: newWidth ? newWidth - 20 : null,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          };

          var newChildren = _react.default.Children.map(node.props.children, function (child) {
            if (child) {
              return /*#__PURE__*/_react.default.cloneElement(child, {
                style: newStyle
              });
            }

            return null;
          });

          var newNode = /*#__PURE__*/_react.default.cloneElement(node, {}, newChildren);

          var contentClass = (0, _classnames3.default)((0, _defineProperty2.default)({
            content: true
          }, "".concat(contentClassName), true));
          return (0, _jsxRuntime.jsxs)("div", (0, _objectSpread2.default)((0, _objectSpread2.default)({}, node.props), {}, {
            className: tabClass,
            style: !isFirst ? {
              marginLeft: tabBarGutter > 10 ? tabBarGutter - 10 : -tabBarGutter - 10
            } : {},
            children: [!isFirst ? (0, _jsxRuntime.jsxs)("div", {
              className: "prefix",
              children: [(0, _jsxRuntime.jsx)("div", {
                className: "prefix-top"
              }), (0, _jsxRuntime.jsx)("div", {
                className: "prefix-bottom"
              })]
            }) : null, (0, _jsxRuntime.jsx)("div", {
              className: contentClass,
              style: isLast ? {
                borderRight: "1px solid #ccc",
                width: width,
                minWidth: minWidth,
                maxWidth: maxWidth
              } : isFirst ? {
                borderLeft: "1px solid #ccc",
                paddingLeft: tabBarGutter + 20,
                width: width,
                minWidth: minWidth,
                maxWidth: maxWidth
              } : {
                width: width,
                minWidth: minWidth,
                maxWidth: maxWidth
              },
              children: newNode
            }), !isLast ? (0, _jsxRuntime.jsx)("div", {
              className: "suffix"
            }) : null]
          }));
        }
      }))
    });
  };

  return (0, _jsxRuntime.jsx)(_configProvider.default, {
    prefixCls: "mart",
    children: (0, _jsxRuntime.jsx)(_tabs.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
      type: "editable-card",
      onChange: onChange,
      activeKey: activeKey,
      hideAdd: true,
      renderTabBar: renderTabBar,
      tabBarGutter: -tabBarGutter,
      children: props.children
    }))
  });
}

;
WuiTabs.TabPane = TabPane;
var _default = WuiTabs;
exports.default = _default;