import type { ModalProps } from 'antd/lib/modal';
export declare type WuiModalProps<T> = {
  /** Modal是否可以拖动 */
  draggable?: boolean;
} & Omit<ModalProps, 'draggable'>;
