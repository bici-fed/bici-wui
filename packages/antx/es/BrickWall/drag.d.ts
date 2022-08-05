import { AcceptorProps, DragProps } from './typing';
export declare const Dragger: (option: DragProps) => JSX.Element;
export declare const Acceptor: (option: AcceptorProps) => JSX.Element;
export declare const dragList: (list: Array<any>, crtIndex: number, willIndex: number) => any[];
export declare const dragToList: (list: Array<any>, targetList: Array<any>, crtIndex: number, willIndex: number, del: 1 | 2) => {
    list: any[];
    targetList: any[];
};
