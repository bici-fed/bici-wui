import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import { jsx as _jsx } from "react/jsx-runtime";
import _ from 'lodash';
import React from 'react';
import Drag from './Drag';

var Modal = /*#__PURE__*/function (_React$Component) {
  _inherits(Modal, _React$Component);

  var _super = _createSuper(Modal);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

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
    _this.draggleRef = /*#__PURE__*/React.createRef();

    _this.updateTransform = function (transformStr) {
      _this.draggleRef.current.style.transform = transformStr;
    };

    return _this;
  }

  _createClass(Modal, [{
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

      var restProps = _.omit(this.props, ['modalRender', 'title']);

      return _jsx(_ConfigProvider, {
        prefixCls: "mart",
        children: _jsx(_Modal, _objectSpread(_objectSpread({
          title: draggable ? _jsx(Drag, {
            updateTransform: this.updateTransform,
            children: _jsx("div", {
              children: this.props.title
            })
          }) : this.props.title,
          modalRender: function modalRender(modal) {
            return _jsx("div", {
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
}(React.Component);

export default Modal;