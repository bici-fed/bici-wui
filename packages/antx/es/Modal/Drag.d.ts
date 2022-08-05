import React from "react";
import PropTypes from "prop-types";
interface DragProps {
    updateTransform: (transformStr: string, tx: number, ty: number, tdom: HTMLElement) => void;
}
export default class Drag extends React.Component<DragProps> {
    static propTypes: {
        children: PropTypes.Validator<PropTypes.ReactElementLike>;
    };
    tdom: HTMLElement;
    static defaultProps: {
        updateTransform: (transformStr: string, tx: number, ty: number, tdom: HTMLElement) => void;
    };
    position: {
        startX: number;
        startY: number;
        dx: number;
        dy: number;
        tx: number;
        ty: number;
    };
    start: (event: MouseEvent) => void;
    docMove: (event: MouseEvent) => void;
    docMouseUp: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.DetailedReactHTMLElement<{
        ref: (tdom: HTMLElement) => HTMLElement;
        style: any;
    }, HTMLElement>;
}
export {};
