import type { UploadChangeParam, UploadListProps, UploadProps } from 'antd/lib/upload';

export type WuiUploadProps<T> = {
  /**
   *
   * @description 模块id 如101
   * @description.zh-CN a
   * @default true
   */
  mappingType: string;
  /**
   *
   * @description 模块id 如101
   * @description.zh-CN a
   * @default true
   */
  mappingId: string;
  token: string;
} & Omit<UploadProps, 'mappingType' | 'mappingId' | 'token'>;
