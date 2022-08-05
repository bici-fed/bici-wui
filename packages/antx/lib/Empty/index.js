"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

require("antd/es/config-provider/style");

var _configProvider = _interopRequireDefault(require("antd/es/config-provider"));

require("antd/es/empty/style");

var _empty = _interopRequireDefault(require("antd/es/empty"));

var _jsxRuntime = require("react/jsx-runtime");

var _networkerror = _interopRequireDefault(require("./images/networkerror.png"));

var _adddevice = _interopRequireDefault(require("./images/adddevice.png"));

var _nofile = _interopRequireDefault(require("./images/nofile.png"));

var _nomessage = _interopRequireDefault(require("./images/nomessage.png"));

var _searchResultEmpty = _interopRequireDefault(require("./images/searchResultEmpty.png"));

var _associatedCockpit = _interopRequireDefault(require("./images/associatedCockpit.png"));

var _equipmentWorkWell = _interopRequireDefault(require("./images/equipmentWorkWell.png"));

var _noHistoryTrend = _interopRequireDefault(require("./images/noHistoryTrend.png"));

// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
var Empty = function Empty(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type;
  var style = {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)'
  };
  var childStyle = {
    fontSize: 14,
    fontWeight: 'normal',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)'
  };
  var emptyMap = {
    default: {
      image: _empty.default.PRESENTED_IMAGE_SIMPLE,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u6682\u65E0\u6570\u636E"
      })
    },
    searchResultEmpty: {
      image: _searchResultEmpty.default,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u6682\u65E0\u641C\u7D22\u7ED3\u679C"
      })
    },
    addDevice: {
      image: _adddevice.default,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u8BF7\u6DFB\u52A0\u8BBE\u5907"
      })
    },
    noHistoryTrend: {
      image: _noHistoryTrend.default,
      description: (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [(0, _jsxRuntime.jsx)("p", {
          style: style,
          children: "\u6682\u65E0\u5386\u53F2\u8D8B\u52BF\u5206\u6790\u56FE"
        }), (0, _jsxRuntime.jsx)("p", {
          style: childStyle,
          children: "\u8BF7\u5148\u5728\u4E0A\u65B9\u9009\u62E9\u67E5\u8BE2\u6761\u4EF6"
        })]
      })
    },
    noFile: {
      image: _nofile.default,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u6682\u65E0\u76F8\u5173\u6587\u4EF6"
      })
    },
    equipmentWorkWell: {
      image: _equipmentWorkWell.default,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u6682\u65E0\u76F8\u5173\u6587\u4EF6"
      })
    },
    noMessage: {
      image: _nomessage.default,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u6682\u65E0\u65B0\u6D88\u606F"
      })
    },
    associatedCockpit: {
      image: _associatedCockpit.default,
      description: (0, _jsxRuntime.jsx)("p", {
        style: style,
        children: "\u8BF7\u5148\u5173\u8054\u6570\u5B57\u9A7E\u9A76\u8231"
      })
    },
    networkOff: {
      image: _networkerror.default,
      description: (0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [(0, _jsxRuntime.jsx)("p", {
          style: style,
          children: "\u7F51\u7EDC\u8FDE\u63A5\u65AD\u5F00"
        }), (0, _jsxRuntime.jsx)("p", {
          style: childStyle,
          children: "\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8BBE\u7F6E\uFF0C\u91CD\u65B0\u5237\u65B0\u9875\u9762"
        })]
      })
    }
  };
  return (0, _jsxRuntime.jsx)(_configProvider.default, {
    prefixCls: "mart",
    children: (0, _jsxRuntime.jsx)(_empty.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({
      imageStyle: {
        height: type !== 'default' ? 144 : 60
      }
    }, emptyMap[type]), {}, {
      children: props.children
    }))
  });
};

var _default = Empty;
exports.default = _default;