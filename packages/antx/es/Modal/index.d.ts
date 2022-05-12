import React from 'react';
import type { ModalProps } from 'antd';
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
  };
  draggleRef: any;
  onStart: (event: any, uiData: any) => void;
  render(): JSX.Element;
}
export default Modal;
