import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import React from "react";
import PropTypes from "prop-types";

var Drag = /*#__PURE__*/function (_React$Component) {
  _inherits(Drag, _React$Component);

  var _super = _createSuper(Drag);

  function Drag() {
    var _this;

    _classCallCheck(this, Drag);

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

  _createClass(Drag, [{
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

      var newStyle = _objectSpread(_objectSpread({}, children.props.style), {}, {
        cursor: "move",
        userSelect: "none"
      });

      return /*#__PURE__*/React.cloneElement(React.Children.only(children), {
        ref: function ref(tdom) {
          return _this2.tdom = tdom;
        },
        style: newStyle
      });
    }
  }]);

  return Drag;
}(React.Component);

Drag.propTypes = {
  children: PropTypes.element.isRequired
};
Drag.defaultProps = {
  //默认是移动children dom,覆盖该方法，可以把tranform行为同步给外部
  updateTransform: function updateTransform(transformStr, tx, ty, tdom) {
    tdom.style.transform = transformStr;
  }
};
export { Drag as default };