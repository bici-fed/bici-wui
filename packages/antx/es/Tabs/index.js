import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext } from 'react';
import classnames from 'classnames';
import './index.less';
var TabPane = _Tabs.TabPane;

function WuiTabs(props) {
  var _useContext = useContext(_ConfigProvider.ConfigContext),
      getPrefixCls = _useContext.getPrefixCls;

  var prefix = getPrefixCls('wui', 'mart-wui');

  _ConfigProvider.config({
    prefixCls: 'bic'
  });

  var width = props.width,
      minWidth = props.minWidth,
      maxWidth = props.maxWidth,
      _props$tabBarGutter = props.tabBarGutter,
      tabBarGutter = _props$tabBarGutter === void 0 ? 2 : _props$tabBarGutter,
      onChange = props.onChange,
      activeKey = props.activeKey; // 重写tab

  var renderTabBar = function renderTabBar(tabBarProps, DefaultTabBar) {
    var activeKey = tabBarProps.activeKey,
        panes = tabBarProps.panes,
        _tabBarProps$tabBarGu = tabBarProps.tabBarGutter,
        tabBarGutter = _tabBarProps$tabBarGu === void 0 ? 0 : _tabBarProps$tabBarGu;
    var first = panes === null || panes === void 0 ? void 0 : panes[0]; // @ts-ignore

    var last = panes === null || panes === void 0 ? void 0 : panes[panes.length - 1];
    return _jsx(_ConfigProvider, {
      prefixCls: "mart",
      children: _jsx(DefaultTabBar, _objectSpread(_objectSpread({}, tabBarProps), {}, {
        children: function children(node) {
          var _classnames;

          var tabClass = classnames((_classnames = {}, _defineProperty(_classnames, "".concat(prefix, "-tab"), true), _defineProperty(_classnames, "".concat(prefix, "-tab-active"), node.key === activeKey), _classnames));
          var isFirst = first.key === node.key;
          var isLast = last.key === node.key;
          var newWidth = width || maxWidth || minWidth;
          var newStyle = {
            width: newWidth ? newWidth - 20 : null,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          };
          var newChildren = React.Children.map(node.props.children, function (child) {
            if (child) {
              return /*#__PURE__*/React.cloneElement(child, {
                style: newStyle
              });
            }

            return null;
          });
          var newNode = /*#__PURE__*/React.cloneElement(node, {}, newChildren);
          return _jsxs("div", _objectSpread(_objectSpread({}, node.props), {}, {
            className: tabClass,
            style: !isFirst ? {
              marginLeft: tabBarGutter > 10 ? tabBarGutter - 10 : -tabBarGutter - 10
            } : {},
            children: [!isFirst ? _jsxs("div", {
              className: "prefix",
              children: [_jsx("div", {
                className: "prefix-top"
              }), _jsx("div", {
                className: "prefix-bottom"
              })]
            }) : null, _jsx("div", {
              className: "content",
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
            }), !isLast ? _jsx("div", {
              className: "suffix"
            }) : null]
          }));
        }
      }))
    });
  };

  return _jsx(_ConfigProvider, {
    prefixCls: "mart",
    children: _jsx(_Tabs, {
      type: "editable-card",
      onChange: onChange,
      activeKey: activeKey,
      hideAdd: true,
      renderTabBar: renderTabBar,
      tabBarGutter: -tabBarGutter,
      children: props.children
    })
  });
}

;
WuiTabs.TabPane = TabPane;
export default WuiTabs;