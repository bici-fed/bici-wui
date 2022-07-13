import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import { Masonry } from 'masonic';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Acceptor, Dragger, dragList } from './drag';

var BrickWall = function BrickWall(props) {
  var _props$draggable = props.draggable,
    draggable = _props$draggable === void 0 ? false : _props$draggable;

  var _React$useState = React.useState(props.items),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    cards = _React$useState2[0],
    setCards = _React$useState2[1];

  var MasonryCard = function MasonryCard(_ref) {
    var index = _ref.index,
      data = _ref.data,
      width = _ref.width;

    var CardItem = function CardItem() {
      return /*#__PURE__*/ React.cloneElement(
        props.renderItem(),
        _objectSpread(
          _objectSpread({}, data),
          {},
          {
            index: index,
            width: width,
          },
        ),
      );
    }; //同列表之间拖曳

    var handleDrag = function handleDrag(crt, target) {
      var items = dragList(props.items, crt, target);
      setCards(items);
    };

    var renderDrag = function renderDrag(item, children) {
      return /*#__PURE__*/ React.createElement(Acceptor, {
        key: item.type,
        name: item.title,
        data: item,
        type: 'card',
        role: 'card',
        onHover: function onHover() {},
        content: /*#__PURE__*/ React.createElement(Dragger, {
          name: item.title,
          data: item,
          type: 'card',
          role: 'card',
          content: children,
          onDragFinished: function onDragFinished(source, target) {
            props.onDragFinished && props.onDragFinished(source, target);

            if (target) {
              handleDrag(source.data.index, target.data.index);
            }
          },
        }),
        styleType: 'border',
      });
    };

    return draggable
      ? renderDrag(
          _objectSpread(
            _objectSpread({}, data),
            {},
            {
              index: index,
              width: width,
            },
          ),
          /*#__PURE__*/ React.createElement(CardItem, _objectSpread({}, data)),
        )
      : /*#__PURE__*/ React.createElement(CardItem, null);
  };

  var _props$rowGutter = props.rowGutter,
    rowGutter = _props$rowGutter === void 0 ? 10 : _props$rowGutter,
    _props$columnGutter = props.columnGutter,
    columnGutter = _props$columnGutter === void 0 ? 10 : _props$columnGutter,
    columnWidth = props.columnWidth,
    columnCount = props.columnCount;
  return /*#__PURE__*/ React.createElement(
    DndProvider,
    {
      backend: HTML5Backend,
    },
    /*#__PURE__*/ React.createElement(Masonry, {
      items: cards,
      render: MasonryCard,
      columnWidth: columnWidth,
      rowGutter: rowGutter,
      columnGutter: columnGutter,
      columnCount: columnCount,
    }),
  );
};

export default BrickWall;
