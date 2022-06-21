import { BrickWall } from '@bici-wui/antx';
import React from 'react';

let i = 0;
const items = Array.from(Array(10), () => ({ id: i++, name: 'jufeng' }));

const BrickWallDemo = () => {
  const Card = (prop: any) => (
    <div style={{ boxSizing: 'border-box', border: '1px solid #ccc' }}>
      <div>Index: {prop.index}</div>
      <pre>ID: {prop.id}</pre>
      <div>Column width: {prop.width}</div>
      <div>Column other: {prop.other}</div>
    </div>
  );
  const onDragFinished = (source: any, target: any) => {
    console.log('业务处理毁掉函数');
  };
  return (
    <BrickWall
      items={items}
      draggable={true}
      columnGutter={10}
      columnWidth={210}
      onDragFinished={onDragFinished}
      renderItem={() => <Card other="mjk" />}
    />
  );
};
export default BrickWallDemo;
