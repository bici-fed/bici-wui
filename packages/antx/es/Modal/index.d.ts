import React from 'react';
import type { ModalProps } from 'antd';
import { WuiModalProps } from './typing';
export type { WuiModalProps };
export declare const WuiModal: React.FC<WuiModalProps<ModalProps>>;
declare class Modal extends React.Component<WuiModalProps<ModalProps>> {
  state: {
    visible: boolean;
    disabled: boolean;
    bounds: {
      left: number;
      top: number;
      bottom: number;
      right: number;
    };
  };
  draggleRef: any;
  showModal: () => void;
  handleOk: (e: any) => void;
  handleCancel: (e: any) => void;
  onStart: (event: any, uiData: any) => void;
  render(): JSX.Element;
}
export default Modal;
