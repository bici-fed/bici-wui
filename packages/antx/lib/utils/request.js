'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault').default;

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.http = exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties'),
);

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _utils = require('@bici-wui/utils');

var _excluded = ['code', 'msg', 'data'];

/**+++++++++++++++++++获得中航上大APP的请求实例对象，这部分和上面的Request类可以拆分+++++++++++++++++++++++++++++++++++*/
// 封装请求方法
var client = new _utils.BaseRequest({
  baseURL: 'http://zhsd.dev.bicisims.com:31892',
  timeout: 10000,
  maxContentLength: 1000000,
  interceptors: {
    requestInterceptors: function requestInterceptors(config) {
      console.log('实例请求拦截器', config.data);
      var _config$quiet = config.quiet,
        quiet = _config$quiet === void 0 ? false : _config$quiet; // if (!quiet) {
      //   loading.start();
      // }
      // 在发送请求之前做些什么
      // const { account } = store.getState();
      // const { token } = account;

      var headers = (0, _objectSpread2.default)(
        {
          token: '',
        },
        config.headers,
      );
      return (0, _objectSpread2.default)(
        (0, _objectSpread2.default)({}, config),
        {},
        {
          headers: headers,
        },
      );
      return config;
    },
    responseInterceptors: function responseInterceptors(result) {
      console.log('实例响应拦截器', result.data); // loading.stop();

      var _result$data = result.data,
        code = _result$data.code,
        msg = _result$data.msg,
        _data = _result$data.data,
        arg = (0, _objectWithoutProperties2.default)(_result$data, _excluded);

      var _code = code + '';

      var data = (0, _objectSpread2.default)(
        {
          data: _data,
        },
        arg,
      );

      switch (_code) {
        case '200':
          return data.total !== undefined ? data : data.data;

        case '40115':
          // Toast.info(`${code}: ${msg}`, 1.5);
          // store.dispatch({ type: 'account/logout' });
          return undefined;

        default:
          // Toast.info(`${code}: ${msg}`, 1.5);
          return undefined;
      }

      return result.data;
    },
    responseInterceptorsCatch: function responseInterceptorsCatch(_err) {
      // console.log('++++++++++++++++responseInterceptorsCatch++++++++++++');
      // console.log(err);
      // Toast.info(`系统繁忙，请稍后再试！`, 1.5);
      // loading.stop();
    },
    requestInterceptorsCatch: function requestInterceptorsCatch(_err) {
      // console.log('++++++++++++++++requestInterceptorsCatch++++++++++++');
      // console.log(err);
      // Toast.info(`请求错误，请稍后再试！`, 1.5);
      // loading.stop();
    },
  },
});

var http = function http(config) {
  var _config$method = config.method,
    method = _config$method === void 0 ? 'GET' : _config$method,
    url = config.url;
  console.log('http>>>>>>>>>>>>>');

  if (method === 'get' || method === 'GET') {
    config.params = config.data || {};
  }

  return client.request(config);
};

exports.http = http;
var _default = http;
exports.default = _default;
