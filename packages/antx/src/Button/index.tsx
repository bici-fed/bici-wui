import React, { useContext } from 'react';
import { Button as AButton, ConfigProvider } from 'antd';
import './index.less';

/**
 * 
 * @returns 我们要求覆盖 antd 的样式必须要使用 .@{ant-prefix} 变量来生成类名，在 js 中使用如下代码来配置实现。
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${包名}');
 */

const Button = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('bici-wui-button');
  return (
    <AButton type="primary" className={className}>
      这是一个按钮
    </AButton>
  );
};

export default Button;
