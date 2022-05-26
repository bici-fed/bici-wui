import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/config-provider/style';
import _ConfigProvider from 'antd/es/config-provider';
import React, { useContext } from 'react';
import './index.less';
/**
 *
 * @returns 我们要求覆盖 antd 的样式必须要使用 .@{ant-prefix} 变量来生成类名，在 js 中使用如下代码来配置实现。
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${包名}');
 */

var Button = function Button() {
  var _useContext = useContext(_ConfigProvider.ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;

  var className = getPrefixCls('bici-wui-button');
  return /*#__PURE__*/ React.createElement(
    _Button,
    {
      type: 'primary',
      className: className,
    },
    '\u8FD9\u662F\u4E00\u4E2A\u6309\u94AE',
  );
};

export default Button;
