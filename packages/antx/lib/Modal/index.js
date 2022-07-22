'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault').default;

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

require('antd/es/modal/style');

var _modal = _interopRequireDefault(require('antd/es/modal'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

var _reactDraggable = _interopRequireDefault(require('react-draggable'));

var _lodash = _interopRequireDefault(require('lodash'));

var _uuid = require('../utils/uuid');

function parentUntil(ele, eleId) {
  var parent = undefined;

  do {
    var pd = ele.parentNode || ele.parentElement;

    if (document.getElementById(eleId) == pd) {
      parent = pd;
    }
  } while (!parent);

  return parent;
}

var Modal = /*#__PURE__*/ (function (_React$Component) {
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
        right: 0,
      },
      disabled: false,
    };
    _this.id = (0, _uuid.s8)();
    _this.draggleRef = /*#__PURE__*/ _react.default.createRef();
    _this.titleRef = /*#__PURE__*/ _react.default.createRef();

    _this.onStart = function (event, uiData) {
      var _this$draggleRef$curr;

      var parentDom = event.target;

      if (document.getElementById(_this.id) !== parentDom) {
        parentDom = parentUntil(parentDom, _this.id);
      }

      if (_this.titleRef.current != parentDom) {
        return;
      }

      var _window$document$docu = window.document.documentElement,
        clientWidth = _window$document$docu.clientWidth,
        clientHeight = _window$document$docu.clientHeight;
      var targetRect =
        (_this$draggleRef$curr = _this.draggleRef.current) === null ||
        _this$draggleRef$curr === void 0
          ? void 0
          : _this$draggleRef$curr.getBoundingClientRect();

      if (parentDom.dataset.drag !== 'yes') {
        return;
      }

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

  (0, _createClass2.default)(Modal, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setState({
          disabled: this.props.draggable,
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var bounds = this.state.bounds;

        var restProps = _lodash.default.omit(this.props, ['modalRender', 'title']);

        var draggable = this.props.draggable;
        return /*#__PURE__*/ _react.default.createElement(
          _react.default.Fragment,
          null,
          /*#__PURE__*/ _react.default.createElement(
            _modal.default,
            (0, _objectSpread2.default)(
              (0, _objectSpread2.default)(
                {
                  title: /*#__PURE__*/ _react.default.createElement(
                    'div',
                    {
                      ref: this.titleRef,
                      style: {
                        width: '100%',
                        cursor: draggable ? 'move' : 'default',
                      },
                      id: this.id,
                      'data-drag': 'yes',
                      onMouseOver: function onMouseOver() {
                        if (_this2.props.draggable) {
                          _this2.setState({
                            disabled: true,
                          });
                        }
                      },
                      onMouseOut: function onMouseOut() {
                        _this2.setState({
                          disabled: false,
                        });
                      },
                      onMouseDown: function onMouseDown(e) {
                        e.cancelable = true;
                      },
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
                  return /*#__PURE__*/ _react.default.createElement(
                    _reactDraggable.default,
                    {
                      disabled: !_this2.state.disabled,
                      bounds: bounds,
                      onStart: function onStart(event, uiData) {
                        _this2.onStart(event, uiData);
                      },
                    },
                    /*#__PURE__*/ _react.default.createElement(
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
})(_react.default.Component);

var _default = Modal;
exports.default = _default;
