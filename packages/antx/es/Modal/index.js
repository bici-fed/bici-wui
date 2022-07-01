import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _Modal from 'antd/es/modal';
import 'antd/es/modal/style';
import _ from 'lodash';
import React from 'react';
import Draggable from 'react-draggable';

var Modal = /*#__PURE__*/ (function (_React$Component) {
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
        right: 0,
      },
    };
    _this.draggleRef = /*#__PURE__*/ React.createRef();

    _this.onStart = function (event, uiData) {
      var _this$draggleRef$curr;

      var _window$document$docu = window.document.documentElement,
        clientWidth = _window$document$docu.clientWidth,
        clientHeight = _window$document$docu.clientHeight;
      var targetRect =
        (_this$draggleRef$curr = _this.draggleRef.current) === null ||
        _this$draggleRef$curr === void 0
          ? void 0
          : _this$draggleRef$curr.getBoundingClientRect();

      if (!targetRect) {
        return;
      }

      _this.setState({
        bounds: {
          left: -targetRect.left + uiData.x,
          right: clientWidth - (targetRect.right - uiData.x),
          top: -targetRect.top + uiData.y,
          bottom: clientHeight - (targetRect.bottom - uiData.y),
        },
      });
    };

    return _this;
  }

  _createClass(Modal, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var bounds = this.state.bounds;

        var restProps = _.omit(this.props, ['modalRender', 'title']);

        var draggable = this.props.draggable;
        return /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement(
            _Modal,
            _objectSpread(
              _objectSpread(
                {
                  title: /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      style: {
                        width: '100%',
                        cursor: draggable ? 'move' : 'default',
                      },
                      onMouseOver: function onMouseOver() {},
                      onMouseOut: function onMouseOut() {},
                      // fix eslintjsx-a11y/mouse-events-have-key-events
                      // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                      onFocus: function onFocus() {},
                      onBlur: function onBlur() {},
                    },
                    this.props.title,
                  ),
                },
                restProps,
              ),
              {},
              {
                modalRender: function modalRender(modal) {
                  return /*#__PURE__*/ React.createElement(
                    Draggable,
                    {
                      disabled: !draggable,
                      bounds: bounds,
                      onStart: function onStart(event, uiData) {
                        return _this2.onStart(event, uiData);
                      },
                    },
                    /*#__PURE__*/ React.createElement(
                      'div',
                      {
                        ref: _this2.draggleRef,
                      },
                      modal,
                    ),
                  );
                },
              },
            ),
            this.props.children,
          ),
        );
      },
    },
  ]);

  return Modal;
})(React.Component);

export default Modal;
