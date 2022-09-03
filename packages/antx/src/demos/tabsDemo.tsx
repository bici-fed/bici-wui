import React, {useState} from 'react';
import { Tabs } from '@bici-wui/antx';
import {ConfigProvider} from 'antd';
import './index.less';

const { TabPane } = Tabs;

const initialPanes = [
  {
    title: '阿哈哈哈',
    content: 'Content of Tab 1',
    key: '1',
    closable: false,
  },
  {
    title: 'Tab 222',
    content: 'Content of Tab 2',
    key: '2',
    closable: false,
  },
  {
    title: '恋足',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
  {
    title: '点巡检阿哈哈哈',
    content: 'Content of Tab 4',
    key: '4',
    closable: false,
  },
  {
    title: 'Tab 5',
    content: 'Content of Tab 5',
    key: '5',
    closable: false,
  },
  {
    title: '设计思路设计思路',
    content: 'Content of Tab 5',
    key: '6',
    closable: false,
  },
  {
    title: '设计思路',
    content: 'Content of Tab 5',
    key: '7',
    closable: false,
  },
  {
    title: '设计思路',
    content: 'Content of Tab 8',
    key: '8',
    closable: false,
  },
];


const TreeDemo = () => {
  const [activeKey, setActiveKey] = useState(initialPanes[0].key);
  const [panes, setPanes] = useState(initialPanes);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };


  return (
    <div style={{background: '#ccc'}}>
      <Tabs activeKey={activeKey} className="hahha" onChange={onChange} tabBarGutter={0}>
        {(panes||[]).map((pane) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default TreeDemo;
