import React from 'react';
import { Empty as ANTEmpty, Button } from 'antd';
import { BiciEmptyProps } from './typing';

const Empty: React.FC<React.FC<BiciEmptyProps>> = () => (
  <ANTEmpty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
  >
    <Button type="primary">Create Now</Button>
  </ANTEmpty>
);

export default Empty;
