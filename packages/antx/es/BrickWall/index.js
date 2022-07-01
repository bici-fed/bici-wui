import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import { Masonry } from 'masonic';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Acceptor, Dragger, dragList } from './drag';

var BrickWall = function BrickWall(props) {
  var _props$draggable = props.draggable,
    draggable = _props$draggable === void 0 ? false : _props$draggable;

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
      dragList(props.items, crt, target);
    };

    var renderDrag = function renderDrag(item, children) {
      return /*#__PURE__*/ React.createElement(Acceptor, {
        key: item.type,
        name: item.title,
        data: item,
        type: 'xxx',
        role: 'xxxAccept',
        onHover: function onHover() {},
        content: /*#__PURE__*/ React.createElement(Dragger, {
          name: item.title,
          data: item,
          type: 'xxx',
          role: 'xxxDrag',
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
          /*#__PURE__*/ React.createElement(CardItem, null),
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
      items: props.items,
      render: MasonryCard,
      columnWidth: columnWidth,
      rowGutter: rowGutter,
      columnGutter: columnGutter,
      columnCount: columnCount,
    }),
  );
};

export default BrickWall;
