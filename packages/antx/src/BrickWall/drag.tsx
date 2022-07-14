import React from 'react';
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

  const r = React.cloneElement(option.content, { dragRef: drag });

  return (
    <div ref={preview} role={option.role} style={{ opacity }} data-id={`${option.name}`}>
      {r}
    </div>
  );
};
export const Acceptor = (option: AcceptorProps) => {
  const { name, data, type, styleType, onHover } = option;
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: () => option,
    hover: () => {
      if (onHover) {
        onHover();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#fff';
  let boxShadow = '0 0px 8px rgba(0, 0, 0, 0)';
  if (isActive) {
    backgroundColor = 'antiquewhite';
    boxShadow = '0 0px 8px rgba(0, 0, 0, 0.3)';
  } else if (canDrop) {
    backgroundColor = '#fff';
    boxShadow = '0px 0px 8px rgba(0, 0, 0, 0.2)';
  }
  return (
    <div
      ref={drop}
      role={'Acceptor'}
      style={styleType === 'background' ? { backgroundColor } : { boxShadow }}
    >
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
