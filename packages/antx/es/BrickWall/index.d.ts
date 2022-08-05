declare type BrickWallProps = {
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
declare const BrickWall: (props: BrickWallProps) => JSX.Element;
export default BrickWall;
