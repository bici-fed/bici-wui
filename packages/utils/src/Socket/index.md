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
  React.useEffect(() => {
    new Socket('sss', {});
  }, []);

  return (
    <div>
      <Button>连接websocket</Button>
    </div>
  );
};

export default SocketDemo;
```
