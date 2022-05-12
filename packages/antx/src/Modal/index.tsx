import React from 'react';
import { Modal as ANTModal, Button } from 'antd';
import type { ModalProps } from 'antd';
import Draggable from 'react-draggable';
import _ from 'lodash';
import { WuiModalProps } from './typing';

export type { WuiModalProps };

class Modal extends React.Component<WuiModalProps<ModalProps>> {
  state = {
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  };

  draggleRef = React.createRef() as any;

  onStart = (event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = (this.draggleRef.current as any)?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    this.setState({
      bounds: {
        left: -targetRect.left + uiData.x,
        right: clientWidth - (targetRect.right - uiData.x),
        top: -targetRect.top + uiData.y,
        bottom: clientHeight - (targetRect.bottom - uiData.y),
      },
    });
  };

  render() {
    const { bounds, disabled } = this.state;
    const restProps = _.omit(this.props, ['modalRender', 'title']);
    return (
      <>
        <ANTModal
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  this.setState({
                    disabled: false,
                  });
                }
              }}
              onMouseOut={() => {
                this.setState({
                  disabled: true,
                });
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              {this.props.title}
            </div>
          }
          {...restProps}
          modalRender={(modal) => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => this.onStart(event, uiData)}
            >
              <div ref={this.draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
          {this.props.children}
        </ANTModal>
      </>
    );
  }
}

export default Modal;
