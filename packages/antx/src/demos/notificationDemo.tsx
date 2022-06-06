import React from 'react';
import { Notification } from '@bici-wui/antx';
import { Button } from 'antd';

/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */

const NotificationDemo = () => {
  const showModal = () => {
    Notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const openNotificationWithIcon = (type: NotificationType) => {
    Notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  return (
    <>
      <Button onClick={showModal} type="primary">
        打开消息
      </Button>
      <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
      <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
      <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
      <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
    </>
  );
};

export default NotificationDemo;
