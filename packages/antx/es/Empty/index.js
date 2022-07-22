import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import 'antd/es/empty/style';
import _Empty from 'antd/es/empty';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
// @ts-ignore
import networkerror from './images/networkerror.png'; // @ts-ignore

import adddevice from './images/adddevice.png'; // @ts-ignore

import nofile from './images/nofile.png'; // @ts-ignore

import nomessage from './images/nomessage.png'; // @ts-ignore

import searchResultEmpty from './images/searchResultEmpty.png'; // @ts-ignore

import associatedCockpit from './images/associatedCockpit.png'; // @ts-ignore

import equipmentWorkWell from './images/equipmentWorkWell.png'; // @ts-ignore

import noHistoryTrend from './images/noHistoryTrend.png';

var Empty = function Empty(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? 'default' : _props$type;
  var style = {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
  };
  var childStyle = {
    fontSize: 14,
    fontWeight: 'normal',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.4)',
  };
  var emptyMap = {
    default: {
      image: _Empty.PRESENTED_IMAGE_SIMPLE,
      description: _jsx('p', {
        style: style,
        children: '\u6682\u65E0\u6570\u636E',
      }),
    },
    searchResultEmpty: {
      image: searchResultEmpty,
      description: _jsx('p', {
        style: style,
        children: '\u6682\u65E0\u641C\u7D22\u7ED3\u679C',
      }),
    },
    addDevice: {
      image: adddevice,
      description: _jsx('p', {
        style: style,
        children: '\u8BF7\u6DFB\u52A0\u8BBE\u5907',
      }),
    },
    noHistoryTrend: {
      image: noHistoryTrend,
      description: _jsxs(_Fragment, {
        children: [
          _jsx('p', {
            style: style,
            children: '\u6682\u65E0\u5386\u53F2\u8D8B\u52BF\u5206\u6790\u56FE',
          }),
          _jsx('p', {
            style: childStyle,
            children: '\u8BF7\u5148\u5728\u4E0A\u65B9\u9009\u62E9\u67E5\u8BE2\u6761\u4EF6',
          }),
        ],
      }),
    },
    noFile: {
      image: nofile,
      description: _jsx('p', {
        style: style,
        children: '\u6682\u65E0\u76F8\u5173\u6587\u4EF6',
      }),
    },
    equipmentWorkWell: {
      image: equipmentWorkWell,
      description: _jsx('p', {
        style: style,
        children: '\u6682\u65E0\u76F8\u5173\u6587\u4EF6',
      }),
    },
    noMessage: {
      image: nomessage,
      description: _jsx('p', {
        style: style,
        children: '\u6682\u65E0\u65B0\u6D88\u606F',
      }),
    },
    associatedCockpit: {
      image: associatedCockpit,
      description: _jsx('p', {
        style: style,
        children: '\u8BF7\u5148\u5173\u8054\u6570\u5B57\u9A7E\u9A76\u8231',
      }),
    },
    networkOff: {
      image: networkerror,
      description: _jsxs(_Fragment, {
        children: [
          _jsx('p', {
            style: style,
            children: '\u7F51\u7EDC\u8FDE\u63A5\u65AD\u5F00',
          }),
          _jsx('p', {
            style: childStyle,
            children:
              '\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8BBE\u7F6E\uFF0C\u91CD\u65B0\u5237\u65B0\u9875\u9762',
          }),
        ],
      }),
    },
  };
  return _jsx(
    _Empty,
    _objectSpread(
      _objectSpread(
        {
          imageStyle: {
            height: type !== 'default' ? 144 : 60,
          },
        },
        emptyMap[type],
      ),
      {},
      {
        children: props.children,
      },
    ),
  );
};

export default Empty;
