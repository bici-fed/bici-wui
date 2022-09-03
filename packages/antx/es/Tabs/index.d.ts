/// <reference types="react" />
import type { TabsProps as RcTabsProps } from 'rc-tabs';
import './index.less';
export interface WuiTabProps extends Omit<RcTabsProps, 'editable'> {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    tabBarGutter?: number;
    activeKey?: string;
    contentClassName?: string;
    onChange?: (newActiveKey: string) => void;
}
declare function WuiTabs(props: WuiTabProps): JSX.Element;
declare namespace WuiTabs {
    var TabPane;
}
export default WuiTabs;
