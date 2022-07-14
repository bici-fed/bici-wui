import { useMasonry, usePositioner, useResizeObserver } from 'masonic';
import { useScroller, useSize } from 'mini-virtual-list';
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

  const containerRef = React.useRef(null);
  const { width, height } = useSize(containerRef);

  const { scrollTop, isScrolling } = useScroller(containerRef);
  const positioner = usePositioner({
    width,
    columnWidth: 172,
    columnGutter: 8,
  });

  const resizeObserver = useResizeObserver(positioner);

  const [cards, setCards] = React.useState(props.items);

  const MasonryCard = ({ index, data, width }: any) => {
    const CardItem = () => React.cloneElement(props.renderItem(), { ...data, index, width });
    //同列表之间拖曳
    const handleDrag = (crt: number, target: number) => {
      const items = dragList(props.items, crt, target);
      setCards(items);
    };
    const renderDrag = (item: any, children: any) => {
      return (
        <Acceptor
          key={item.type}
          name={item.title}
          data={item}
          type="card"
          role="card"
          onHover={() => {}}
          content={
            <Dragger
              name={item.title}
              data={item}
              type="card"
              role="card"
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

    return draggable ? renderDrag({ ...data, index, width }, <CardItem {...data} />) : <CardItem />;
  };

  const { rowGutter = 10, columnGutter = 10, columnWidth, columnCount } = props;

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     console.log(123)
  //     // @ts-ignore
  //     containerRef.current.style.width=200+"px";
  //     const myEvent = new Event('resize');
  //     window.dispatchEvent(myEvent);
  //   },10000)
  //
  // },[])

  return (
    <DndProvider backend={HTML5Backend}>
      <div ref={containerRef}>
        {/*<Masonry*/}
        {/*  resizeObserver={resizeObserver}*/}
        {/*  items={cards}*/}
        {/*  render={MasonryCard}*/}
        {/*  columnWidth={columnWidth}*/}
        {/*  rowGutter={rowGutter}*/}
        {/*  columnGutter={columnGutter}*/}
        {/*  columnCount={columnCount}*/}
        {/*/>*/}
        {/*{useMasonry({*/}
        {/*  positioner,*/}
        {/*  resizeObserver,*/}
        {/*  cards,*/}
        {/*  height,*/}
        {/*  scrollTop,*/}
        {/*  isScrolling,*/}
        {/*  overscanBy: 6,*/}
        {/*  render: MasonryCard*/}
        {/*})}*/}
        {useMasonry({
          positioner,
          resizeObserver,
          scrollTop,
          isScrolling,
          height,
          containerRef,
          items: cards,
          overscanBy: 1,
          render: MasonryCard,
        })}
      </div>
    </DndProvider>
  );
};

export default BrickWall;
