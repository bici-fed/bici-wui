"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _jsxRuntime = require("react/jsx-runtime");

var _masonic = require("masonic");

var _miniVirtualList = require("mini-virtual-list");

var React = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _drag = require("./drag");

var BrickWall = function BrickWall(props) {
  var _props$rowGutter = props.rowGutter,
      rowGutter = _props$rowGutter === void 0 ? 10 : _props$rowGutter,
      _props$columnGutter = props.columnGutter,
      columnGutter = _props$columnGutter === void 0 ? 10 : _props$columnGutter,
      columnWidth = props.columnWidth,
      columnCount = props.columnCount,
      _props$draggable = props.draggable,
      draggable = _props$draggable === void 0 ? false : _props$draggable;
  var containerRef = React.useRef(null);

  var _useSize = (0, _miniVirtualList.useSize)(containerRef),
      width = _useSize.width,
      height = _useSize.height;

  var _useScroller = (0, _miniVirtualList.useScroller)(containerRef),
      scrollTop = _useScroller.scrollTop,
      isScrolling = _useScroller.isScrolling;

  (0, React.useEffect)(function () {
    setTimeout(function () {
      var myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    }, 100);
  }, []);
  var positioner = (0, _masonic.usePositioner)({
    width: width,
    columnWidth: columnWidth,
    columnGutter: columnGutter,
    rowGutter: rowGutter,
    columnCount: columnCount
  });
  var resizeObserver = (0, _masonic.useResizeObserver)(positioner);

  var _React$useState = React.useState(props.items),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      cards = _React$useState2[0],
      setCards = _React$useState2[1];

  var MasonryCard = function MasonryCard(_ref) {
    var index = _ref.index,
        data = _ref.data,
        width = _ref.width;

    var CardItem = function CardItem(_ref2) {
      var prop = (0, _extends2.default)({}, _ref2);
      return /*#__PURE__*/React.cloneElement(props.renderItem(), (0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
        index: index,
        width: width
      }, prop));
    }; //同列表之间拖曳


    var handleDrag = function handleDrag(crt, target) {
      var items = (0, _drag.dragList)(props.items, crt, target);
      setCards(items);
    };

    var renderDrag = function renderDrag(item, children) {
      return (0, _jsxRuntime.jsx)(_drag.Acceptor, {
        name: item.id,
        data: item,
        type: "card",
        role: "card",
        onHover: function onHover() {},
        onActive: function onActive(dataIndex) {
          var delIndex = dataIndex < index ? dataIndex : dataIndex + 1;
          handleDrag(dataIndex, delIndex);
        },
        content: (0, _jsxRuntime.jsx)(_drag.Dragger, {
          name: item.id,
          data: item,
          type: "card",
          role: "card",
          content: children,
          onDragFinished: function onDragFinished(source, target) {
            props.onDragFinished && props.onDragFinished(source, target);

            if (target) {
              handleDrag(source.data.index, target.data.index);
            }
          }
        }),
        styleType: "border"
      }, item.type);
    };

    return draggable ? renderDrag((0, _objectSpread2.default)((0, _objectSpread2.default)({}, data), {}, {
      index: index,
      width: width
    }), (0, _jsxRuntime.jsx)(CardItem, (0, _objectSpread2.default)({}, data))) : (0, _jsxRuntime.jsx)(CardItem, {});
  };

  return (0, _jsxRuntime.jsx)(_reactDnd.DndProvider, {
    backend: _reactDndHtml5Backend.HTML5Backend,
    children: (0, _jsxRuntime.jsx)("div", {
      ref: containerRef,
      children: (0, _masonic.useMasonry)({
        positioner: positioner,
        resizeObserver: resizeObserver,
        scrollTop: scrollTop,
        isScrolling: isScrolling,
        height: height,
        containerRef: containerRef,
        items: cards,
        overscanBy: 1,
        render: MasonryCard
      })
    })
  });
};

var _default = BrickWall;
exports.default = _default;