export type DragProps = {
  name: string; //名称标记
  type: string; //暂用于标记拖拽类型,接收者和发送者一致
  role: string; //
  data: any; //绑定的数据用于拖曳后操作数据
  content: JSX.Element; //绑定的元素
  onDragFinished: Function; //拖动结束回调.
};

export type AcceptorProps = {
  name: string; //名称标记
  type: string; //暂用于标记拖拽类型,接收者和发送者一致
  role: string; //
  data: any; //绑定的数据用于拖曳后操作数据
  content: JSX.Element; //绑定的元素
  styleType: 'background' | 'border';
  // customStyle:{
  //     canDrop:string,
  //     isActive:string
  // }
  onHover: Function; //移入区域.
  onActive: Function; //当前可以放置.
};
