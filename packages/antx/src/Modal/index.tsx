import type { ModalProps } from 'antd';
import { Modal as ANTModal,ConfigProvider } from 'antd';
import _ from 'lodash';
import React from 'react';
import Drag from './Drag';
import { WuiModalProps } from './typing';

export type { WuiModalProps };

class Modal extends React.Component<WuiModalProps<ModalProps>> {
  state = {
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    disabled: false,
  };
  componentDidMount() {
    this.setState({ disabled: this.props.draggable });
  }
  draggleRef = React.createRef() as any;
  updateTransform = (transformStr: string) => {
    this.draggleRef.current.style.transform = transformStr
  }
  render() {
    const {draggable} = this.props;
    const restProps = _.omit(this.props, ['modalRender', 'title']);
    return (
      <ConfigProvider prefixCls="mart">
        <ANTModal
          title={
            draggable?(
              <Drag updateTransform={this.updateTransform}>
                <div>{this.props.title}</div>
              </Drag>
            ):this.props.title
          }
          modalRender={(modal) => (
              <div ref={this.draggleRef}>{modal}</div>
          )}
          {...restProps}
        >
          {this.props.children}
        </ANTModal>
      </ConfigProvider>
    );
  }
}

export default Modal;
