import type { UploadProps } from 'antd/lib/upload';
export declare type WuiUploadProps<T> = {
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
  /**
   *
   * @description 文件上传大小限制，默认为0，则上传大小限制服务端控制
   * @description.zh-CN a
   * @default 0
   */
  maxSize: number;
  /**
   *
   * @description 文件超过大小限制后的提示信息
   * @description.zh-CN a
   * @default 0
   */
  maxSizeOverflowWarning?: string;
  /**
   *
   * @description 文件上传路径
   * @description.zh-CN a
   * @default 0
   */
  action: string;
  /**
   *
   * @description 文件下载路径
   * @description.zh-CN a
   * @default 0
   */
  downloadAction: string;
  /**
   *
   * @description 文件删除路径
   * @description.zh-CN a
   * @default 0
   */
  deleteAction: string;
} & Omit<UploadProps, 'mappingType' | 'mappingId' | 'token'>;
