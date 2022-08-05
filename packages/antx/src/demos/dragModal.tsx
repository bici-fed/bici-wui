import { Modal } from '@bici-wui/antx';
import { Button } from 'antd';
import React, { useState } from 'react';

/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */

const ModalDemo = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={showModal} type="primary">
        打开对话框
      </Button>
      <Modal
        draggable={true}
        width={1000}
        title="基本使用modal"
        onCancel={handleCancel}
        onOk={handleOk}
        visible={visible}
      >
        <p>asasa</p>
      </Modal>
    </>
  );
};

export default ModalDemo;
