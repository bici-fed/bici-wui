---
title: Socket
group:
  path: /utils
  title: 工具(utils)
nav:
  title: 组件
  path: /components
---

## websocket

#### 实例化基础请求类

```tsx
import React from 'react';
import { Button } from 'antd';
import { Socket } from '@bici-wui/utils';

const SocketDemo = () => {
  const [wsIn, setWsIn] = React.useState(null);
  React.useEffect(() => {
    const ws = new Socket(
      'wss://zhsd-test.bicisims.com/api/websocket/service/websocket/alarm/1qCf6ylNuMFOqgP8EMU4Wt',
      {
        reconnectLimit: 10,
        reconnectInterval: 3000,
        manual: false,
      },
    );
    setWsIn(ws);
  }, []);

  const sendMassage = () => {
    if (wsIn) {
      wsIn.init();
      wsIn.sendMessage({ a: 1, b: 2 });
    }
  };

  const close = () => {
    if (wsIn) {
      wsIn.disconnect();
    }
  };

  return (
    <div>
      <Button onClick={sendMassage}>连接websocket</Button>
      <Button onClick={close}>断开websocket</Button>
    </div>
  );
};

export default SocketDemo;
```
