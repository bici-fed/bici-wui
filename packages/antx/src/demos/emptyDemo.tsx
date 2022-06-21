import { Empty } from '@bici-wui/antx';
import { Button } from 'antd';
import React from 'react';

const EmptyDemo = () => {
  return (
    <div>
      <Empty />
      <Empty type="addDevice" />
      <Empty type="searchResultEmpty" />
      <Empty type="noHistoryTrend" />
      <Empty type="noFile" />
      <Empty type="equipmentWorkWell" />
      <Empty type="noMessage" />
      <Empty type="associatedCockpit">
        <Button>关联驾驶舱</Button>
      </Empty>
      <Empty type="networkOff" />
    </div>
  );
};

export default EmptyDemo;
