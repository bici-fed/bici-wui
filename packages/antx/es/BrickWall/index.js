import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { jsx as _jsx } from "react/jsx-runtime";
import { useMasonry, usePositioner, useResizeObserver } from 'masonic';
import { useScroller, useSize } from 'mini-virtual-list';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Acceptor, Dragger, dragList } from './drag';
import { useEffect } from "react";

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

  var _useSize = useSize(containerRef),
      width = _useSize.width,
      height = _useSize.height;

  var _useScroller = useScroller(containerRef),
      scrollTop = _useScroller.scrollTop,
      isScrolling = _useScroller.isScrolling;

  useEffect(function () {
    setTimeout(function () {
      var myEvent = new Event('resize');
      window.dispatchEvent(myEvent);
    }, 100);
  }, []);
  var positioner = usePositioner({
    width: width,
    columnWidth: columnWidth,
    columnGutter: columnGutter,
    rowGutter: rowGutter,
    columnCount: columnCount
  });
  var resizeObserver = useResizeObserver(positioner);

  var _React$useState = React.useState(props.items),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      cards = _React$useState2[0],
      setCards = _React$useState2[1];

  var MasonryCard = function MasonryCard(_ref) {
    var index = _ref.index,
        data = _ref.data,
        width = _ref.width;

    var CardItem = function CardItem(_ref2) {
      var prop = _extends({}, _ref2);

      return /*#__PURE__*/React.cloneElement(props.renderItem(), _objectSpread(_objectSpread({}, data), {}, {
        index: index,
        width: width
      }, prop));
    }; //同列表之间拖曳


    var handleDrag = function handleDrag(crt, target) {
      var items = dragList(props.items, crt, target);
      setCards(items);
    };

    var renderDrag = function renderDrag(item, children) {
      return _jsx(Acceptor, {
        name: item.id,
        data: item,
        type: "card",
        role: "card",
        onHover: function onHover() {},
        onActive: function onActive(dataIndex) {
          var delIndex = dataIndex < index ? dataIndex : dataIndex + 1;
          handleDrag(dataIndex, delIndex);
        },
        content: _jsx(Dragger, {
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

    return draggable ? renderDrag(_objectSpread(_objectSpread({}, data), {}, {
      index: index,
      width: width
    }), _jsx(CardItem, _objectSpread({}, data))) : _jsx(CardItem, {});
  };

  return _jsx(DndProvider, {
    backend: HTML5Backend,
    children: _jsx("div", {
      ref: containerRef,
      children: useMasonry({
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

export default BrickWall;