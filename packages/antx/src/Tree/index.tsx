import React, { useState } from 'react';
import { Tree as ANTTree } from 'antd';
import {
  CarryOutOutlined,
  FormOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  DownOutlined,
} from '@ant-design/icons';
import type { DataNode } from 'antd/lib/tree';

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <PlusSquareOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
          { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
        ],
      },
    ],
  },
];

const Tree: React.FC = () => {
  const [showLine, setShowLine] = useState<boolean | { showLeafIcon: boolean }>(true);
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean>(true);

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const onSetLeafIcon = (checked: boolean) => {
    setShowLeafIcon(checked);
    setShowLine({ showLeafIcon: checked });
  };

  const onSetShowLine = (checked: boolean) => {
    setShowLine(checked ? { showLeafIcon } : false);
  };

  const switcherIcon = ({ expanded }) => {
    return !expanded ? (
      <PlusSquareOutlined style={{ fontSize: 16 }} />
    ) : (
      <MinusSquareOutlined style={{ fontSize: 16 }} />
    );
  };

  return (
    <ANTTree
      showLine={showLine}
      showIcon={showIcon}
      defaultExpandedKeys={['0-0-0']}
      onSelect={onSelect}
      treeData={treeData}
      rootStyle={{ fontSize: 16 }}
      checkable
    />
  );
};

export default Tree;
