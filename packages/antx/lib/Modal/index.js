"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/config-provider/style");

var _configProvider = _interopRequireDefault(require("antd/es/config-provider"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _jsxRuntime = require("react/jsx-runtime");

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _Drag = _interopRequireDefault(require("./Drag"));

var Modal = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Modal, _React$Component);

  var _super = (0, _createSuper2.default)(Modal);

  function Modal() {
    var _this;

    (0, _classCallCheck2.default)(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      bounds: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      },
      disabled: false
    };
    _this.draggleRef = /*#__PURE__*/_react.default.createRef();

    _this.updateTransform = function (transformStr) {
      _this.draggleRef.current.style.transform = transformStr;
    };

    return _this;
  }

  (0, _createClass2.default)(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        disabled: this.props.draggable
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var draggable = this.props.draggable;

      var restProps = _lodash.default.omit(this.props, ['modalRender', 'title']);

      return (0, _jsxRuntime.jsx)(_configProvider.default, {
        prefixCls: "mart",
        children: (0, _jsxRuntime.jsx)(_modal.default, (0, _objectSpread2.default)((0, _objectSpread2.default)({
          title: draggable ? (0, _jsxRuntime.jsx)(_Drag.default, {
            updateTransform: this.updateTransform,
            children: (0, _jsxRuntime.jsx)("div", {
              children: this.props.title
            })
          }) : this.props.title,
          modalRender: function modalRender(modal) {
            return (0, _jsxRuntime.jsx)("div", {
              ref: _this2.draggleRef,
              children: modal
            });
          }
        }, restProps), {}, {
          children: this.props.children
        }))
      });
    }
  }]);
  return Modal;
}(_react.default.Component);

var _default = Modal;
exports.default = _default;