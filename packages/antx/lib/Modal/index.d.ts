import type { ModalProps } from 'antd';
import React from 'react';
import { WuiModalProps } from './typing';
export type { WuiModalProps };
declare class Modal extends React.Component<WuiModalProps<ModalProps>> {
  state: {
    bounds: {
      left: number;
      top: number;
      bottom: number;
      right: number;
    };
    disabled: boolean;
  };
  id: string;
  componentDidMount(): void;
  draggleRef: any;
  titleRef: any;
  onStart: (event: any, uiData: any) => void;
  render(): JSX.Element;
}
export default Modal;
