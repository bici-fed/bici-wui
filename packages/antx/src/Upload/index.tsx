/**
 * 文件上传
 */
import React, { useState } from 'react';
import { Upload, ConfigProvider } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/es/upload/style';
import { WuiUploadProps } from './typing';
import { downloadById, fileDelete, fetchUpload } from './util';

type UploadFilesType = UploadFile<any>[];

const BiciUpload: React.FC<WuiUploadProps<UploadProps>> = (props) => {
  const [fileList, setFileList] = useState<any>([]);
  const [uploading, setUploading] = useState(false);

  /**
   * 发送文件上传请求
   */
  const uploadFileRequest = (formData: FormData, token: string) => {
    setUploading(true);
    fetchUpload(props.action, formData, token).then((res: any) => {
      console.log('----->>>>>', res);
    });
  };

  /**
   * 手动处理文件上传。beforeUpload 返回 false 后，手动上传文件。
   */
  const handleUpload = () => {
    console.log('-------->>>>');
    const { mappingId, mappingType, token } = props;
    const formData = new FormData();
    fileList.forEach((file: { originFileObj: RcFile }) => {
      formData.append('file', file.originFileObj as RcFile);
    });
    formData.append('mappingId', mappingId);
    formData.append('mappingType', mappingType);
    uploadFileRequest(formData, token);
  };

  /**
   * 文件上传之前的钩子,
   * 若返回 false 则停止上传，支持返回 Promise 对象
   */
  const beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    const { maxSizeOverflowWarning, maxSize = 0 } = props;
    const { size } = file;
    const defaultSize = `${maxSize / (1024 * 1024)}M`;
    const defaultSizeOverflowWarning = `文件大小超过限制, 最大支持${defaultSize}!`;
    const message = maxSizeOverflowWarning || defaultSizeOverflowWarning;
    if (maxSize > 0 && size > maxSize) {
      // biciNotification.warning({ message })
      return false;
    }
    return true;
  };
  /** 文件状态改变 */
  const onChange: UploadProps['onChange'] = ({ fileList, file }) => {
    const { size } = file;
    const { maxSize = 0 } = props;

    console.log('onchange++++++', fileList, file);

    if (size && size > maxSize) {
      const t = fileList.filter((v) => v.status === 'uploading');
      setFileList(t);
    } else {
      const updatedFileList = fileList.map((file) => {
        const { status, response } = file;
        if (status === 'done' && response) {
          const { code, data } = response;
          if (code === 1000 || code === '200') {
            return { ...file, uid: data[0] };
          }
          return { ...file, status: 'error' };
        }
        return file;
      });
      setFileList(updatedFileList);
    }
  };

  const getBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  /**
   * 文件链接或预览图标点击时的回调
   */
  const onPreview = async (file: { originFileObj?: any; uid?: any }) => {
    const { uid: id } = file;
    let previewImage: any;
    if (file.originFileObj) {
      previewImage = await getBase64(file.originFileObj);
    } else {
      previewImage = await downloadById({ id });
    }
    // this.setState({ previewImage, previewVisible: true })
  };

  /**
   * 点击移除文件时的回调，返回值为 false 时不移除。
   * 支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
   */
  const onRemove = async (file: { uid: any }) => {
    const { uid: id } = file;
    await fileDelete({ id });
  };

  /**
   * 点击下载文件时的回调
   */
  const onDownload = async (file: { uid: any; name: any }) => {
    const { uid: id, name } = file;
    const url = await downloadById({ id });
    const res = await fetch(url as Request | string);
    const blob = await res.blob();
    const objectUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(objectUrl);
  };

  // 文件上传配置
  const uploadProps: UploadProps = {
    multiple: true,
    defaultFileList: props.defaultFileList,
    customRequest: handleUpload,
    beforeUpload,
    onChange,
    onDownload,
    onRemove,
    onPreview,
    showUploadList: {
      showDownloadIcon: true,
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
  };

  return (
    <ConfigProvider prefixCls="mart">
      <Upload {...uploadProps}>{props.children}</Upload>
    </ConfigProvider>
  );
};

export default BiciUpload;
