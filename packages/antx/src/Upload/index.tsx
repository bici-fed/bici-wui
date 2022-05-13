import React from 'react';
import { Upload as ANTUpload, UploadProps } from 'antd';
import { WuiUploadProps } from './typing';

const Upload: React.FC<WuiUploadProps<UploadProps>> = (props) => {
  console.log('这是来自smartangus的提交');
  return (
  <div>文件上传</div>
  );
};

export default Upload;
