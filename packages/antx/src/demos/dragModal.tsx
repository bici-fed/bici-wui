import React, { useState } from 'react';
import { Modal } from '@bici-wui/antx';
import { Button } from 'antd';

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
      <Button onClick={showModal}>Open Draggable Modal1</Button>
      <Modal
        width={1000}
        title={<div style={{ color: 'red' }}>基本使用modal</div>}
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
