import { Empty as ANTEmpty, ConfigProvider } from 'antd';
import React from 'react';
import { BiciEmptyProps } from './typing';
// @ts-ignore
import networkerror from './images/networkerror.png';
// @ts-ignore
import adddevice from './images/adddevice.png';
// @ts-ignore
import nofile from './images/nofile.png';
// @ts-ignore
import nomessage from './images/nomessage.png';
// @ts-ignore
import searchResultEmpty from './images/searchResultEmpty.png';
// @ts-ignore
import associatedCockpit from './images/associatedCockpit.png';
// @ts-ignore
import equipmentWorkWell from './images/equipmentWorkWell.png';
// @ts-ignore
import noHistoryTrend from './images/noHistoryTrend.png';

const Empty: React.FC<BiciEmptyProps> = (props) => {
  const { type = 'default' } = props;
  const style = {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  };
  const childStyle = {
    fontSize: 14,
    fontWeight: 'normal',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
  };
  const emptyMap = {
    default: {
      image: ANTEmpty.PRESENTED_IMAGE_SIMPLE,
      description: <p style={style}>暂无数据</p>,
    },
    searchResultEmpty: {
      image: searchResultEmpty,
      description: <p style={style}>暂无搜索结果</p>,
    },
    addDevice: {
      image: adddevice,
      description: <p style={style}>请添加设备</p>,
    },
    noHistoryTrend: {
      image: noHistoryTrend,
      description: (
        <>
          <p style={style}>暂无历史趋势分析图</p>
          <p style={childStyle}>请先在上方选择查询条件</p>
        </>
      ),
    },
    noFile: {
      image: nofile,
      description: <p style={style}>暂无相关文件</p>,
    },
    equipmentWorkWell: {
      image: equipmentWorkWell,
      description: <p style={style}>暂无相关文件</p>,
    },
    noMessage: {
      image: nomessage,
      description: <p style={style}>暂无新消息</p>,
    },
    associatedCockpit: {
      image: associatedCockpit,
      description: <p style={style}>请先关联数字驾驶舱</p>,
    },
    networkOff: {
      image: networkerror,
      description: (
        <>
          <p style={style}>网络连接断开</p>
          <p style={childStyle}>请检查网络设置，重新刷新页面</p>
        </>
      ),
    },
  };
  return (
    <ConfigProvider prefixCls="mart">
      <ANTEmpty
        imageStyle={{
          height: type !== 'default' ? 144 : 60,
        }}
        {...emptyMap[type]}
      >
        {props.children}
      </ANTEmpty>
    </ConfigProvider>
  );
};

export default Empty;
