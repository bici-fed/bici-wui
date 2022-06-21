import { Masonry } from 'masonic';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Acceptor, Dragger, dragList } from './drag';

type BrickWallProps = {
  /** 是否可以拖动排序*/
  draggable?: boolean;
  /**数据*/
  items: any[];
  /**每一项的渲染*/
  renderItem: any;
  /**拖动结束的回调*/
  onDragFinished?: (source: any, target: any) => void;
  /**行间距*/
  rowGutter?: number;
  /**列间距*/
  columnGutter?: number;
  /**列宽*/
  columnWidth?: number;
  /**每一行的列数量*/
  columnCount?: number;
};

const BrickWall = (props: BrickWallProps) => {
  const { draggable = false } = props;
  const MasonryCard = ({ index, data, width }: any) => {
    const CardItem = () => React.cloneElement(props.renderItem(), { ...data, index, width });
    //同列表之间拖曳
    const handleDrag = (crt: number, target: number) => {
      dragList(props.items, crt, target);
    };
    const renderDrag = (item: any, children: any) => {
      return (
        <Acceptor
          key={item.type}
          name={item.title}
          data={item}
          type="xxx"
          role="xxxAccept"
          onHover={() => {}}
          content={
            <Dragger
              name={item.title}
              data={item}
              type="xxx"
              role="xxxDrag"
              content={children}
              onDragFinished={(source: any, target: any) => {
                props.onDragFinished && props.onDragFinished(source, target);
                if (target) {
                  handleDrag(source.data.index, target.data.index);
                }
              }}
            />
          }
          styleType="border"
        />
      );
    };

    return draggable ? renderDrag({ ...data, index, width }, <CardItem />) : <CardItem />;
  };

  const { rowGutter = 10, columnGutter = 10, columnWidth, columnCount } = props;

  return (
    <DndProvider backend={HTML5Backend}>
      <Masonry
        items={props.items}
        render={MasonryCard}
        columnWidth={columnWidth}
        rowGutter={rowGutter}
        columnGutter={columnGutter}
        columnCount={columnCount}
      />
    </DndProvider>
  );
};

export default BrickWall;
