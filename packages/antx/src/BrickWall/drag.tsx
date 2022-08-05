import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AcceptorProps, DragProps } from './typing';

export const Dragger = (option: DragProps) => {
  const { name, data, type, onDragFinished } = option;
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: type,
    item: { name: name, data: data },
    end: (item, monitor, ...arg) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // console.log('source:', item);
        // console.log('target:', dropResult);
      }
      if (onDragFinished) {
        onDragFinished(item, dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;
  const display = isDragging ? 'none' : 'block';

  const r = React.cloneElement(option.content, { dragRef: drag });

  return (
    <div ref={preview} role={option.role} style={{ opacity, display }} data-id={`${option.name}`}>
      {r}
    </div>
  );
};
export const Acceptor = (option: AcceptorProps) => {
  const { name, type, styleType, onHover, onActive } = option;
  let dataIndex = useRef(null);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: (item, monitor) => {
      return option;
    },
    hover: (item: any, monitor) => {
      dataIndex.current = item?.data.index;
      if (onHover) {
        onHover();
      }
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));

  const isActive = canDrop && isOver;

  // 默认
  let boxShadow = '';
  let opacity = 1;
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
  return (
    <div ref={drop} role={'Acceptor'} style={{ opacity }}>
      {option.content}
    </div>
  );
};
//同一list之间拖动
export const dragList = (list: Array<any>, crtIndex: number, willIndex: number) => {
  let targetItem = list[crtIndex];
  let delIndex = crtIndex < willIndex ? crtIndex : crtIndex + 1;
  list.splice(willIndex, 0, targetItem);
  list.splice(delIndex, 1);
  return list;
};

//来自不同list之间拖动，1.删除原来  2不删除原来
export const dragToList = (
  list: Array<any>,
  targetList: Array<any>,
  crtIndex: number,
  willIndex: number,
  del: 1 | 2,
) => {
  let targetItem = list[crtIndex];
  targetList.splice(willIndex, 0, targetItem);
  if (del === 1) {
    list.splice(crtIndex, 1);
  }

  return { list, targetList };
};
