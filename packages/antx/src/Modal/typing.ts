import type { ModalProps } from 'antd/lib/modal';

export type WuiModalProps<T> = {
  /**
   * 可以这样写属性描述
   * @description       也可以显式加上描述名
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述，使用 description 兜底
   * @default           支持定义默认值
   */
  draggable?: boolean;
} & Omit<ModalProps, 'draggable'>;
