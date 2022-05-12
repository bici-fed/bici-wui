import React from 'react';
import { Upload as ANTUpload, UploadProps } from 'antd';
import { WuiUploadProps } from './typing';

const Upload: React.FC<WuiUploadProps<UploadProps>> = (props) => {
  return <div>文件上传</div>;
};

export default Upload;
