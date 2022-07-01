'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault').default;

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.dragToList = exports.dragList = exports.Dragger = exports.Acceptor = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireDefault(require('react'));

var _reactDnd = require('react-dnd');

var Dragger = function Dragger(option) {
  var name = option.name,
    data = option.data,
    type = option.type,
    onDragFinished = option.onDragFinished;

  var _useDrag = (0, _reactDnd.useDrag)(function () {
      return {
        type: type,
        item: {
          name: name,
          data: data,
        },
        end: function end(item, monitor) {
          var dropResult = monitor.getDropResult();

          if (item && dropResult) {
            console.log('source:', item);
            console.log('target:', dropResult);
          }

          if (onDragFinished) {
            onDragFinished(item, dropResult);
          }
        },
        collect: function collect(monitor) {
          return {
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
          };
        },
      };
    }),
    _useDrag2 = (0, _slicedToArray2.default)(_useDrag, 2),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1];

  var opacity = isDragging ? 0.4 : 1;
  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      ref: drag,
      role: option.role,
      style: {
        opacity: opacity,
      },
      'data-id': ''.concat(option.name),
    },
    option.content,
  );
};

exports.Dragger = Dragger;

var Acceptor = function Acceptor(option) {
  var name = option.name,
    data = option.data,
    type = option.type,
    styleType = option.styleType,
    onHover = option.onHover;

  var _useDrop = (0, _reactDnd.useDrop)(function () {
      return {
        accept: type,
        drop: function drop() {
          return option;
        },
        hover: function hover() {
          if (onHover) {
            onHover();
          }
        },
        collect: function collect(monitor) {
          return {
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          };
        },
      };
    }),
    _useDrop2 = (0, _slicedToArray2.default)(_useDrop, 2),
    _useDrop2$ = _useDrop2[0],
    canDrop = _useDrop2$.canDrop,
    isOver = _useDrop2$.isOver,
    drop = _useDrop2[1];

  var isActive = canDrop && isOver;
  var backgroundColor = '#fff';
  var border = '0px solid rgba(31, 92, 206, 0)';

  if (isActive) {
    backgroundColor = 'antiquewhite';
    border = '1px solid #26BD11';
  } else if (canDrop) {
    backgroundColor = '#fff';
    border = '1px solid #2063AF';
  }

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      ref: drop,
      role: 'Acceptor',
      style:
        styleType === 'background'
          ? {
              backgroundColor: backgroundColor,
            }
          : {
              border: border,
            },
    },
    option.content,
  );
}; //同一list之间拖动

exports.Acceptor = Acceptor;

var dragList = function dragList(list, crtIndex, willIndex) {
  var targetItem = list[crtIndex];
  var delIndex = crtIndex < willIndex ? crtIndex : crtIndex + 1;
  list.splice(willIndex, 0, targetItem);
  list.splice(delIndex, 1);
  return list;
}; //来自不同list之间拖动，1.删除原来  2不删除原来

exports.dragList = dragList;

var dragToList = function dragToList(list, targetList, crtIndex, willIndex, del) {
  var targetItem = list[crtIndex];
  targetList.splice(willIndex, 0, targetItem);

  if (del === 1) {
    list.splice(crtIndex, 1);
  }

  return {
    list: list,
    targetList: targetList,
  };
};

exports.dragToList = dragToList;
