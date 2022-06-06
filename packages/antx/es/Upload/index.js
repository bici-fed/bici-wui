import 'antd/es/upload/style';
import _Upload from 'antd/es/upload';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';

/**
 * 文件上传
 */
import React, { useState } from 'react';
import 'antd/es/upload/style';
import { downloadById, fileDelete, fetchUpload } from './util';

var BiciUpload = function BiciUpload(props) {
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    fileList = _useState2[0],
    setFileList = _useState2[1];

  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    uploading = _useState4[0],
    setUploading = _useState4[1];
  /**
   * 发送文件上传请求
   */

  var uploadFileRequest = function uploadFileRequest(formData, token) {
    setUploading(true);
    fetchUpload(props.action, formData, token).then(function (res) {
      console.log('----->>>>>', res);
    });
  };
  /**
   * 手动处理文件上传。beforeUpload 返回 false 后，手动上传文件。
   */

  var handleUpload = function handleUpload() {
    console.log('-------->>>>');
    var mappingId = props.mappingId,
      mappingType = props.mappingType,
      token = props.token;
    var formData = new FormData();
    fileList.forEach(function (file) {
      formData.append('file', file.originFileObj);
    });
    formData.append('mappingId', mappingId);
    formData.append('mappingType', mappingType);
    uploadFileRequest(formData, token);
  };
  /**
   * 文件上传之前的钩子,
   * 若返回 false 则停止上传，支持返回 Promise 对象
   */

  var beforeUpload = function beforeUpload(file, fileList) {
    var maxSizeOverflowWarning = props.maxSizeOverflowWarning,
      _props$maxSize = props.maxSize,
      maxSize = _props$maxSize === void 0 ? 0 : _props$maxSize;
    var size = file.size;
    var defaultSize = ''.concat(maxSize / (1024 * 1024), 'M');
    var defaultSizeOverflowWarning =
      '\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7\u9650\u5236, \u6700\u5927\u652F\u6301'.concat(
        defaultSize,
        '!',
      );
    var message = maxSizeOverflowWarning || defaultSizeOverflowWarning;

    if (maxSize > 0 && size > maxSize) {
      // biciNotification.warning({ message })
      return false;
    }

    return true;
  };
  /** 文件状态改变 */

  var onChange = function onChange(_ref) {
    var fileList = _ref.fileList,
      file = _ref.file;
    var size = file.size;
    var _props$maxSize2 = props.maxSize,
      maxSize = _props$maxSize2 === void 0 ? 0 : _props$maxSize2;
    console.log('onchange++++++', fileList, file);

    if (size && size > maxSize) {
      var t = fileList.filter(function (v) {
        return v.status === 'uploading';
      });
      setFileList(t);
    } else {
      var updatedFileList = fileList.map(function (file) {
        var status = file.status,
          response = file.response;

        if (status === 'done' && response) {
          var code = response.code,
            data = response.data;

          if (code === 1000 || code === '200') {
            return _objectSpread(
              _objectSpread({}, file),
              {},
              {
                uid: data[0],
              },
            );
          }

          return _objectSpread(
            _objectSpread({}, file),
            {},
            {
              status: 'error',
            },
          );
        }

        return file;
      });
      setFileList(updatedFileList);
    }
  };

  var getBase64 = function getBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        return resolve(reader.result);
      };

      reader.onerror = function (error) {
        return reject(error);
      };
    });
  };
  /**
   * 文件链接或预览图标点击时的回调
   */

  var onPreview = /*#__PURE__*/ (function () {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(file) {
        var id, previewImage;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                id = file.uid;

                if (!file.originFileObj) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return getBase64(file.originFileObj);

              case 4:
                previewImage = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.next = 9;
                return downloadById({
                  id: id,
                });

              case 9:
                previewImage = _context.sent;

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    return function onPreview(_x) {
      return _ref2.apply(this, arguments);
    };
  })();
  /**
   * 点击移除文件时的回调，返回值为 false 时不移除。
   * 支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
   */

  var onRemove = /*#__PURE__*/ (function () {
    var _ref3 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2(file) {
        var id;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                id = file.uid;
                _context2.next = 3;
                return fileDelete({
                  id: id,
                });

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2);
      }),
    );

    return function onRemove(_x2) {
      return _ref3.apply(this, arguments);
    };
  })();
  /**
   * 点击下载文件时的回调
   */

  var onDownload = /*#__PURE__*/ (function () {
    var _ref4 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime.mark(function _callee3(file) {
        var id, name, url, res, blob, objectUrl, a;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                (id = file.uid), (name = file.name);
                _context3.next = 3;
                return downloadById({
                  id: id,
                });

              case 3:
                url = _context3.sent;
                _context3.next = 6;
                return fetch(url);

              case 6:
                res = _context3.sent;
                _context3.next = 9;
                return res.blob();

              case 9:
                blob = _context3.sent;
                objectUrl = window.URL.createObjectURL(blob);
                a = document.createElement('a');
                a.href = objectUrl;
                a.download = name;
                a.click();
                window.URL.revokeObjectURL(objectUrl);

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3);
      }),
    );

    return function onDownload(_x3) {
      return _ref4.apply(this, arguments);
    };
  })(); // 文件上传配置

  var uploadProps = {
    multiple: true,
    defaultFileList: props.defaultFileList,
    customRequest: handleUpload,
    beforeUpload: beforeUpload,
    onChange: onChange,
    onDownload: onDownload,
    onRemove: onRemove,
    onPreview: onPreview,
    showUploadList: {
      showDownloadIcon: true,
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
  };
  return /*#__PURE__*/ React.createElement(_Upload, _objectSpread({}, uploadProps), props.children);
};

export default BiciUpload;
