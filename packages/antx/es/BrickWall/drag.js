import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef } from 'react';
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
        data: data
      },
      end: function end(item, monitor) {
        var dropResult = monitor.getDropResult();

        if (item && dropResult) {// console.log('source:', item);
          // console.log('target:', dropResult);
        }

        if (onDragFinished) {
          onDragFinished(item, dropResult);
        }
      },
      collect: function collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId()
        };
      }
    };
  }),
      _useDrag2 = _slicedToArray(_useDrag, 3),
      isDragging = _useDrag2[0].isDragging,
      drag = _useDrag2[1],
      preview = _useDrag2[2];

  var opacity = isDragging ? 0 : 1;
  var display = isDragging ? 'none' : 'block';
  var r = /*#__PURE__*/React.cloneElement(option.content, {
    dragRef: drag
  });
  return _jsx("div", {
    ref: preview,
    role: option.role,
    style: {
      opacity: opacity,
      display: display
    },
    "data-id": "".concat(option.name),
    children: r
  });
};
export var Acceptor = function Acceptor(option) {
  var name = option.name,
      type = option.type,
      styleType = option.styleType,
      onHover = option.onHover,
      onActive = option.onActive;
  var dataIndex = useRef(null);

  var _useDrop = useDrop(function () {
    return {
      accept: type,
      drop: function drop(item, monitor) {
        return option;
      },
      hover: function hover(item, monitor) {
        dataIndex.current = item === null || item === void 0 ? void 0 : item.data.index;

        if (onHover) {
          onHover();
        }
      },
      collect: function collect(monitor) {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        };
      }
    };
  }),
      _useDrop2 = _slicedToArray(_useDrop, 2),
      _useDrop2$ = _useDrop2[0],
      canDrop = _useDrop2$.canDrop,
      isOver = _useDrop2$.isOver,
      drop = _useDrop2[1];

  var isActive = canDrop && isOver; // 默认

  var boxShadow = '';
  var opacity = 1;

  if (isActive) {
    // 此时可以替换元素
    boxShadow = '0 0px 8px rgba(0, 0, 0, 0.3)';
    opacity = 0;

    if (onActive) {
      onActive(dataIndex.current);
    }
  } else if (canDrop) {
    // 表示可以放置
    boxShadow = '0px 0px 8px rgba(0, 0, 0, 0.8)';
    opacity = 1;
  }

  return _jsx("div", {
    ref: drop,
    role: 'Acceptor',
    style: {
      opacity: opacity
    },
    children: option.content
  });
}; //同一list之间拖动

export var dragList = function dragList(list, crtIndex, willIndex) {
  var targetItem = list[crtIndex];
  var delIndex = crtIndex < willIndex ? crtIndex : crtIndex + 1;
  list.splice(willIndex, 0, targetItem);
  list.splice(delIndex, 1);
  return list;
}; //来自不同list之间拖动，1.删除原来  2不删除原来

export var dragToList = function dragToList(list, targetList, crtIndex, willIndex, del) {
  var targetItem = list[crtIndex];
  targetList.splice(willIndex, 0, targetItem);

  if (del === 1) {
    list.splice(crtIndex, 1);
  }

  return {
    list: list,
    targetList: targetList
  };
};