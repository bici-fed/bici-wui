function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', { writable: false });
  return Constructor;
}

import axios from 'axios';
import { omit } from 'lodash';
/**
 * 请求拦截
 */

export var BaseRequest = /*#__PURE__*/ (function () {
  // axios实例
  // 拦截器对象

  /**
   * 存放取消方法的集合
   * 1、在创建请求后，将取消请求方法push到该集合中
   * 2、封装一个方法，可以取消请求，传入 url:string｜string[]
   * 3、在请求之前判断同一个url是否存在，如果存在就取消请求
   * @param config
   */

  /**
   * 存放所有请求url的集合
   * 1、请求之前将所有的url push到该集合中
   * 2、请求完毕后将url从集合中删除
   * 3、添加在发送请求之前完成，删除在响应之后删除
   */
  function BaseRequest(config) {
    var _this$interceptorsObj,
      _this$interceptorsObj2,
      _this$interceptorsObj3,
      _this$interceptorsObj4;

    _classCallCheck(this, BaseRequest);

    this.instance = void 0;
    this.interceptorsObj = void 0;
    this.cancelRequestSourceList = void 0;
    this.requestUrlList = void 0;

    var axiosConfig = _objectSpread({}, omit(config, ['nterceptors']));

    this.instance = axios.create(axiosConfig);
    this.interceptorsObj = config.interceptors; // 类拦截器

    this.instance.interceptors.request.use(function (res) {
      console.log('全局请求拦截器');
      return res;
    }); // 使用实例拦截器

    this.instance.interceptors.request.use(
      (_this$interceptorsObj = this.interceptorsObj) === null || _this$interceptorsObj === void 0
        ? void 0
        : _this$interceptorsObj.requestInterceptors,
      (_this$interceptorsObj2 = this.interceptorsObj) === null || _this$interceptorsObj2 === void 0
        ? void 0
        : _this$interceptorsObj2.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      (_this$interceptorsObj3 = this.interceptorsObj) === null || _this$interceptorsObj3 === void 0
        ? void 0
        : _this$interceptorsObj3.responseInterceptors,
      (_this$interceptorsObj4 = this.interceptorsObj) === null || _this$interceptorsObj4 === void 0
        ? void 0
        : _this$interceptorsObj4.responseInterceptorsCatch,
    ); // 全局拦截器保证最后执行

    this.instance.interceptors.response.use(
      function (res) {
        console.log('---全局响应拦截器---');
        console.log(res);
        return res;
      },
      function (err) {
        console.log('err>>>', err);
        return err;
      },
    );
  }

  _createClass(BaseRequest, [
    {
      key: 'request',
      value: function request(config) {
        var _this = this;

        // 如果我们为单个请求设置拦截器，这里使用单个请求拦截器
        return new Promise(function (resolve, reject) {
          var _config$interceptors;

          if (
            (_config$interceptors = config.interceptors) === null || _config$interceptors === void 0
              ? void 0
              : _config$interceptors.requestInterceptors
          ) {
            config = config.interceptors.requestInterceptors(config);
          } // url存在保存取消请求方法

          var url = config.url;

          if (url) {
            var _this$requestUrlList;

            (_this$requestUrlList = _this.requestUrlList) === null ||
            _this$requestUrlList === void 0
              ? void 0
              : _this$requestUrlList.push(url);
            config.cancelToken = new axios.CancelToken(function (c) {
              var _this$cancelRequestSo;

              (_this$cancelRequestSo = _this.cancelRequestSourceList) === null ||
              _this$cancelRequestSo === void 0
                ? void 0
                : _this$cancelRequestSo.push(_defineProperty({}, url, c));
            });
          }

          _this.instance
            .request(config)
            .then(function (res) {
              var _config$interceptors2;

              // 如果我们为单个响应设置拦截器，这里使用单个请求的拦截器
              if (
                (_config$interceptors2 = config.interceptors) === null ||
                _config$interceptors2 === void 0
                  ? void 0
                  : _config$interceptors2.responseInterceptors
              ) {
                res = config.interceptors.responseInterceptors(res);
              }

              resolve(res);
            })
            .catch(function (err) {
              reject(err);
            })
            .finally(function () {
              url && _this.delUrl(url);
            });
        });
      },
      /**
       * @description 获取指定url在cancelRequestSourceList中的索引
       * @param url
       * @private
       */
    },
    {
      key: 'getSourceIndex',
      value: function getSourceIndex(url) {
        var _this$cancelRequestSo3;

        return (_this$cancelRequestSo3 = this.cancelRequestSourceList) === null ||
          _this$cancelRequestSo3 === void 0
          ? void 0
          : _this$cancelRequestSo3.findIndex(function (item) {
              return Object.keys(item)[0] === url;
            });
      },
      /**
       * @description 删除requestUrlList和cancelRequestSourceList
       * @param url
       * @private
       */
    },
    {
      key: 'delUrl',
      value: function delUrl(url) {
        var _this$requestUrlList2, _this$requestUrlList3, _this$cancelRequestSo4;

        console.log('delUrl>>', url);
        var urlIndex =
          (_this$requestUrlList2 = this.requestUrlList) === null || _this$requestUrlList2 === void 0
            ? void 0
            : _this$requestUrlList2.findIndex(function (u) {
                return u === url;
              });
        var sourceIndex = this.getSourceIndex(url); // 删除url和cancel方法
        // noinspection TypeScriptValidateTypes

        sourceIndex !== -1 &&
          ((_this$requestUrlList3 = this.requestUrlList) === null ||
          _this$requestUrlList3 === void 0
            ? void 0
            : _this$requestUrlList3.splice(urlIndex, 1)); // noinspection TypeScriptValidateTypes

        sourceIndex !== -1 &&
          ((_this$cancelRequestSo4 = this.cancelRequestSourceList) === null ||
          _this$cancelRequestSo4 === void 0
            ? void 0
            : _this$cancelRequestSo4.splice(sourceIndex, 1));
      },
      /**
       * 取消全部请求
       */
    },
    {
      key: 'cancelAllRequest',
      value: function cancelAllRequest() {
        var _this$cancelRequestSo5;

        (_this$cancelRequestSo5 = this.cancelRequestSourceList) === null ||
        _this$cancelRequestSo5 === void 0
          ? void 0
          : _this$cancelRequestSo5.forEach(function (source) {
              var key = Object.keys(source)[0];
              source[key]();
            });
      },
    },
    {
      key: 'cancelRequest',
      value: function cancelRequest(url) {
        var _this2 = this;

        if (typeof url === 'string') {
          var _this$cancelRequestSo6;

          // 取消单个请求
          var sourceIndex = this.getSourceIndex(url);
          sourceIndex >= 0 &&
            ((_this$cancelRequestSo6 = this.cancelRequestSourceList) === null ||
            _this$cancelRequestSo6 === void 0
              ? void 0
              : _this$cancelRequestSo6[sourceIndex][url]());
        } else {
          // 存在多个需要取消请求的地址
          url.forEach(function (uri) {
            var _this2$cancelRequestS;

            var sourceIndex = _this2.getSourceIndex(uri);

            sourceIndex >= 0 &&
              ((_this2$cancelRequestS = _this2.cancelRequestSourceList) === null ||
              _this2$cancelRequestS === void 0
                ? void 0
                : _this2$cancelRequestS[sourceIndex][uri]());
          });
        }
      },
    },
  ]);

  return BaseRequest;
})();
