import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import { jsx as _jsx } from 'react/jsx-runtime';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
export var Dragger = function Dragger(option) {
  var name = option.name,
    data = option.data,
    type = option.type,
    onDragFinished = option.onDragFinished;

  var _useDrag = useDrag(function () {
      return {
        type: type,
        item: {
          name: name,
          data: data,
        },
        end: function end(item, monitor) {
          var dropResult = monitor.getDropResult();

          if (item && dropResult) {
            // console.log('source:', item);
            // console.log('target:', dropResult);
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
    _useDrag2 = _slicedToArray(_useDrag, 3),
    isDragging = _useDrag2[0].isDragging,
    drag = _useDrag2[1],
    preview = _useDrag2[2];

  var opacity = isDragging ? 0 : 1;
  var r = /*#__PURE__*/ React.cloneElement(option.content, {
    dragRef: drag,
  });
  return _jsx('div', {
    ref: preview,
    role: option.role,
    style: {
      opacity: opacity,
    },
    'data-id': ''.concat(option.name),
    children: r,
  });
};
export var Acceptor = function Acceptor(option) {
  var name = option.name,
    data = option.data,
    type = option.type,
    styleType = option.styleType,
    onHover = option.onHover;

  var _useDrop = useDrop(function () {
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
    _useDrop2 = _slicedToArray(_useDrop, 2),
    _useDrop2$ = _useDrop2[0],
    canDrop = _useDrop2$.canDrop,
    isOver = _useDrop2$.isOver,
    drop = _useDrop2[1];

  var isActive = canDrop && isOver;
  var backgroundColor = '#fff';
  var boxShadow = '0 0px 8px rgba(0, 0, 0, 0)';

  if (isActive) {
    backgroundColor = 'antiquewhite';
    boxShadow = '0 0px 8px rgba(0, 0, 0, 0.3)';
  } else if (canDrop) {
    backgroundColor = '#fff';
    boxShadow = '0px 0px 8px rgba(0, 0, 0, 0.2)';
  }

  return _jsx('div', {
    ref: drop,
    role: 'Acceptor',
    style:
      styleType === 'background'
        ? {
            backgroundColor: backgroundColor,
          }
        : {
            boxShadow: boxShadow,
          },
    children: option.content,
  });
}; //??????list????????????

export var dragList = function dragList(list, crtIndex, willIndex) {
  var targetItem = list[crtIndex];
  var delIndex = crtIndex < willIndex ? crtIndex : crtIndex + 1;
  list.splice(willIndex, 0, targetItem);
  list.splice(delIndex, 1);
  return list;
}; //????????????list???????????????1.????????????  2???????????????

export var dragToList = function dragToList(list, targetList, crtIndex, willIndex, del) {
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
