import { Upload } from '@bici-wui/antx';
import { Button } from 'antd';
import React from 'react';

/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */

const UploadDemo = () => {
  const p = {
    action: '/file/service/file/upload',
    downloadAction: '/file/service/file/downloadById',
    deleteAction: '/file/service/file/delete',
    mappingType: '1221',
    mappingId: '233',
    token: '23ss34',
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
      {
        uid: '2',
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png',
      },
      {
        uid: '3',
        name: 'zzz.png',
        status: 'error',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png',
      },
    ],
  };
  return (
    <>
      <Upload {...p}>
        <Button>点击上传文件</Button>
      </Upload>
    </>
  );
};

export default UploadDemo;
