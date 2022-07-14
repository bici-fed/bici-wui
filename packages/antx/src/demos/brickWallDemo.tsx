import { BrickWall } from '@bici-wui/antx';
import update from 'immutability-helper';
import React, { useState } from 'react';

let i = 0;
const items = Array.from(Array(30), () => ({ id: i++, name: 'jufeng', text: 'hahah' }));

const BrickWallDemo = () => {
  const [cards, setCards] = useState(items);
  const Card = (prop: any) => {
    console.log(prop);
    return (
      <div style={{ boxSizing: 'border-box', border: '1px solid #ccc' }}>
        <div
          ref={prop.dragRef}
          style={{ height: 30, borderBottom: '1px solid green', cursor: 'move' }}
        >
          dragArea
        </div>
        <div>Index: {prop.index}</div>
        <pre>ID: {prop.id}</pre>
        <div>Column width: {prop.width}</div>
        <div>Column other: {prop.other}</div>
      </div>
    );
  };
  const onDragFinished = (source: any, target: any) => {
    console.log('业务处理毁掉函数', source, target);
    if (!source || !target) return;
    setCards((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [source.data.index, 1],
          [target.data.index, 0, prevCards[source.data.index] as any],
        ],
      }),
    );
  };
  return (
    <BrickWall
      items={cards}
      draggable={true}
      columnGutter={10}
      columnWidth={210}
      onDragFinished={onDragFinished}
      renderItem={() => <Card other="mjk" />}
    />
  );
};
export default BrickWallDemo;
