"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Drag = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Drag, _React$Component);

  var _super = (0, _createSuper2.default)(Drag);

  function Drag() {
    var _this;

    (0, _classCallCheck2.default)(this, Drag);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.tdom = void 0;
    _this.position = {
      startX: 0,
      startY: 0,
      dx: 0,
      dy: 0,
      tx: 0,
      ty: 0
    };

    _this.start = function (event) {
      if (event.button != 0) {
        //只允许左键，右键问题在于不选择conextmenu就不会触发mouseup事件
        return;
      }

      document.addEventListener("mousemove", _this.docMove);
      _this.position.startX = event.pageX - _this.position.dx;
      _this.position.startY = event.pageY - _this.position.dy;
    };

    _this.docMove = function (event) {
      var tx = event.pageX - _this.position.startX;
      var ty = event.pageY - _this.position.startY;
      var transformStr = "translate(".concat(tx, "px,").concat(ty, "px)");

      _this.props.updateTransform(transformStr, tx, ty, _this.tdom);

      _this.position.dx = tx;
      _this.position.dy = ty;
    };

    _this.docMouseUp = function () {
      document.removeEventListener("mousemove", _this.docMove);
    };

    return _this;
  }

  (0, _createClass2.default)(Drag, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.tdom.addEventListener("mousedown", this.start); //用document移除对mousemove事件的监听

      document.addEventListener("mouseup", this.docMouseUp);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.tdom.removeEventListener("mousedown", this.start);
      document.removeEventListener("mouseup", this.docMouseUp);
      document.removeEventListener("mousemove", this.docMove);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // @ts-ignore
      var children = this.props.children;
      var newStyle = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, children.props.style), {}, {
        cursor: "move",
        userSelect: "none"
      });
      return /*#__PURE__*/_react.default.cloneElement(_react.default.Children.only(children), {
        ref: function ref(tdom) {
          return _this2.tdom = tdom;
        },
        style: newStyle
      });
    }
  }]);
  return Drag;
}(_react.default.Component);

exports.default = Drag;
Drag.propTypes = {
  children: _propTypes.default.element.isRequired
};
Drag.defaultProps = {
  //默认是移动children dom,覆盖该方法，可以把tranform行为同步给外部
  updateTransform: function updateTransform(transformStr, tx, ty, tdom) {
    tdom.style.transform = transformStr;
  }
};