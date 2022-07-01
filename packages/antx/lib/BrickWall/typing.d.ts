/// <reference types="react" />
export declare type DragProps = {
  name: string;
  type: string;
  role: string;
  data: any;
  content: JSX.Element;
  onDragFinished: Function;
};
export declare type AcceptorProps = {
  name: string;
  type: string;
  role: string;
  data: any;
  content: JSX.Element;
  styleType: 'background' | 'border';
  onHover: Function;
};
