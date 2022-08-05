"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileDelete = exports.fetchUpload = exports.downloadById = void 0;

var _request = _interopRequireDefault(require("../utils/request"));

// 下载附件
var downloadById = function downloadById(params) {
  return (0, _request.default)({
    url: '/file/service/file/downloadById',
    method: 'get',
    data: params,
    quiet: true,
    interceptors: {
      requestInterceptors: function requestInterceptors(config) {
        console.log('单个拦截器');
        return config;
      }
    }
  });
}; // 删除附件


exports.downloadById = downloadById;

var fileDelete = function fileDelete(params) {
  return (0, _request.default)({
    url: '/file/service/file/delete',
    method: 'get',
    data: params,
    quiet: true
  });
};

exports.fileDelete = fileDelete;

var fetchUpload = function fetchUpload(action, params, token) {
  return (0, _request.default)({
    url: action,
    method: 'post',
    data: params,
    quiet: true,
    interceptors: {
      requestInterceptors: function requestInterceptors(config) {
        console.log('单个拦截器', config);
        config.headers = {
          token: token
        };
        return config;
      }
    }
  });
};

exports.fetchUpload = fetchUpload;