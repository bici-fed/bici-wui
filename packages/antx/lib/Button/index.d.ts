import './index.less';
/**
 *
 * @returns 我们要求覆盖 antd 的样式必须要使用 .@{ant-prefix} 变量来生成类名，在 js 中使用如下代码来配置实现。
const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
const prefixCls = getPrefixCls('pro-${包名}');
 */
declare const Button: () => JSX.Element;
export default Button;
