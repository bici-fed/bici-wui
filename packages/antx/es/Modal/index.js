function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj;
          }),
    _typeof(obj)
  );
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  Object.defineProperty(subClass, 'prototype', { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError('Derived constructors may only return object or undefined');
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

import React from 'react';
import { Modal as ANTModal, Button } from 'antd';
import Draggable from 'react-draggable';
export var WuiModal = function WuiModal(props) {
  return /*#__PURE__*/ React.createElement('div', null, 'asasa');
};

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
      visible: false,
      disabled: true,
      bounds: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    };
    _this.draggleRef = /*#__PURE__*/ React.createRef();

    _this.showModal = function () {
      _this.setState({
        visible: true,
      });
    };

    _this.handleOk = function (e) {
      console.log(e);

      _this.setState({
        visible: false,
      });
    };

    _this.handleCancel = function (e) {
      console.log(e);

      _this.setState({
        visible: false,
      });
    };

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

        var _this$state = this.state,
          bounds = _this$state.bounds,
          disabled = _this$state.disabled,
          visible = _this$state.visible;
        return /*#__PURE__*/ React.createElement(
          React.Fragment,
          null,
          /*#__PURE__*/ React.createElement(
            Button,
            {
              onClick: this.showModal,
            },
            'Open Draggable Modal',
          ),
          /*#__PURE__*/ React.createElement(
            ANTModal,
            {
              title: /*#__PURE__*/ React.createElement(
                'div',
                {
                  style: {
                    width: '100%',
                    cursor: 'move',
                  },
                  onMouseOver: function onMouseOver() {
                    if (disabled) {
                      _this2.setState({
                        disabled: false,
                      });
                    }
                  },
                  onMouseOut: function onMouseOut() {
                    _this2.setState({
                      disabled: true,
                    });
                  },
                  // fix eslintjsx-a11y/mouse-events-have-key-events
                  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                  onFocus: function onFocus() {},
                  onBlur: function onBlur() {},
                },
                'Draggable Modal',
              ),
              visible: visible,
              onOk: this.handleOk,
              onCancel: this.handleCancel,
              modalRender: function modalRender(modal) {
                return /*#__PURE__*/ React.createElement(
                  Draggable,
                  {
                    disabled: disabled,
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
            /*#__PURE__*/ React.createElement(
              'p',
              null,
              "Just don't learn physics at school and your life will be full of magic and miracles.",
            ),
            /*#__PURE__*/ React.createElement('br', null),
            /*#__PURE__*/ React.createElement(
              'p',
              null,
              'Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.',
            ),
          ),
        );
      },
    },
  ]);

  return Modal;
})(React.Component);

export default Modal;
