import {Tabs, TabsProps, ConfigProvider} from 'antd';
import React,{useContext} from 'react';
import classnames from 'classnames';
import type { TabsProps as RcTabsProps } from 'rc-tabs';

import './index.less';

const {TabPane} = Tabs;

export interface WuiTabProps extends Omit<RcTabsProps, 'editable'> {
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  tabBarGutter?: number;
  activeKey?: string;
  contentClassName?: string;
  onChange?: (newActiveKey: string) => void;
}

function WuiTabs (props: WuiTabProps) {

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefix = getPrefixCls('wui','mart-wui');
  ConfigProvider.config({
    prefixCls:'bic',
  })

  const {width, minWidth, maxWidth,contentClassName,tabBarGutter=2,onChange,activeKey, ...restProps} = props;
  // 重写tab
  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => {
    const {activeKey, panes, tabBarGutter = 0} = tabBarProps;
    const first = panes?.[0];
    // @ts-ignore
    let last = panes?.[panes.length - 1];
    return (
      <ConfigProvider prefixCls="mart">
        <DefaultTabBar {...tabBarProps}>
          {node => {
            const tabClass = classnames({
              [`${prefix}-tab`]: true,
              [`${prefix}-tab-active`]: node.key === activeKey,
            })
            const isFirst = first.key === node.key;
            const isLast = last.key === node.key;
            const newWidth = width||maxWidth||minWidth;
            const newStyle={
              width: newWidth?newWidth!-20:null,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            };
            const newChildren = React.Children.map(node.props.children, child => {
              if(child){
                return React.cloneElement(child,{
                  style: newStyle
                })
              }
              return null;
            })

            const newNode = React.cloneElement(node,{},newChildren)
            const contentClass = classnames({
              content: true,
              [`${contentClassName}`]: true,
            })

            return (
              <div {...node.props} className={tabClass}
                   style={!isFirst ? {marginLeft: tabBarGutter>10?tabBarGutter-10:-tabBarGutter-10} : {}}>
                {
                  !isFirst ? (
                    <div className="prefix">
                      <div className="prefix-top"></div>
                      <div className="prefix-bottom"></div>
                    </div>
                  ) : null
                }
                <div className={contentClass}
                     style={
                       isLast ? {borderRight: "1px solid #ccc",width, minWidth, maxWidth}
                         : isFirst ? {
                             borderLeft: "1px solid #ccc",
                             paddingLeft: tabBarGutter + 20,
                             width, minWidth, maxWidth
                           }
                           : {
                             width, minWidth, maxWidth
                           }}>{newNode}</div>
                {!isLast ? (<div className="suffix"></div>) : null}
              </div>
            )
          }}
        </DefaultTabBar>
      </ConfigProvider>
    )
  };

  return (
    <ConfigProvider prefixCls="mart">
      <Tabs
        {...restProps}
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        hideAdd
        renderTabBar={renderTabBar}
        tabBarGutter={-tabBarGutter}
      >
        {props.children}
      </Tabs>
    </ConfigProvider>
  );
};

WuiTabs.TabPane = TabPane;

export default WuiTabs;

