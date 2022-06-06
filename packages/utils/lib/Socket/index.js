'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = exports.ReadyState = void 0;

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

var ReadyState;
exports.ReadyState = ReadyState;

(function (ReadyState) {
  ReadyState[(ReadyState['Connecting'] = 0)] = 'Connecting';
  ReadyState[(ReadyState['Open'] = 1)] = 'Open';
  ReadyState[(ReadyState['Closing'] = 2)] = 'Closing';
  ReadyState[(ReadyState['Closed'] = 3)] = 'Closed';
})(ReadyState || (exports.ReadyState = ReadyState = {}));
/**
 * 基本websocket链接类
 */

var Socket = /*#__PURE__*/ (function () {
  // websocket连接实例
  // 重连次数
  // 重连定时器
  // 最新消息
  function Socket(socketUrl, options) {
    var _this = this;

    _classCallCheck(this, Socket);

    this.options = void 0;
    this.socketUrl = void 0;
    this.instance = void 0;
    this.reconnectTimes = 0;
    this.reconnectTimer = 0;
    this.readyState = ReadyState.Closed;
    this.latestMessage = null;

    this.sendMessage = function (message) {
      if (_this.readyState === ReadyState.Open) {
        _this.instance.send(message);
      } else {
        throw new Error('WebSocket disconnected');
      }
    };

    this.disconnect = function () {
      if (_this.reconnectTimer) {
        clearTimeout(_this.reconnectTimer);
      }

      _this.reconnectTimes = _this.options.reconnectLimit;

      _this.instance.close();
    };

    this.options = options;
    this.socketUrl = socketUrl;

    if (!options.manual) {
      this.init();
    }
  }

  _createClass(Socket, [
    {
      key: 'init',
      value: function init() {
        this.connect();
      },
      /**
       * 重新连接
       */
    },
    {
      key: 'reconnect',
      value: function reconnect() {
        var _this2 = this;

        if (
          this.reconnectTimes &&
          this.reconnectTimes < this.options.reconnectLimit &&
          this.instance.readyState !== ReadyState.Open
        ) {
          if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
          }

          this.reconnectTimer = setTimeout(function () {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            _this2.connectWs();

            _this2.reconnectTimes++;
          }, this.options.reconnectInterval);
        }
      },
    },
    {
      key: 'connectWs',
      value:
        /**
         * 连接webscoket
         */
        function connectWs() {
          var _this3 = this;

          if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
          }

          if (this.instance) {
            this.instance.close();
          }

          var ws = new WebSocket(this.socketUrl);
          this.readyState = ReadyState.Connecting;

          ws.onerror = function (event) {
            var _this3$options$onErro, _this3$options;

            _this3.reconnect();

            (_this3$options$onErro = (_this3$options = _this3.options).onError) === null ||
            _this3$options$onErro === void 0
              ? void 0
              : _this3$options$onErro.call(_this3$options, event, ws);
            _this3.readyState = ws.readyState || ReadyState.Closed;
          };

          ws.onopen = function (event) {
            var _this3$options$onOpen, _this3$options2;

            (_this3$options$onOpen = (_this3$options2 = _this3.options).onOpen) === null ||
            _this3$options$onOpen === void 0
              ? void 0
              : _this3$options$onOpen.call(_this3$options2, event, ws);
            _this3.reconnectTimes = 0;
            _this3.readyState = ws.readyState || ReadyState.Open;
          };

          ws.onmessage = function (message) {
            var _this3$options$onOpen2, _this3$options3;

            (_this3$options$onOpen2 = (_this3$options3 = _this3.options).onOpen) === null ||
            _this3$options$onOpen2 === void 0
              ? void 0
              : _this3$options$onOpen2.call(_this3$options3, message, ws);
            _this3.latestMessage = message;
          };

          ws.onclose = function (event) {
            var _this3$options$onClos, _this3$options4;

            _this3.reconnect();

            (_this3$options$onClos = (_this3$options4 = _this3.options).onClose) === null ||
            _this3$options$onClos === void 0
              ? void 0
              : _this3$options$onClos.call(_this3$options4, event, ws);
            _this3.readyState = ws.readyState || ReadyState.Closed;
          };

          this.instance = ws;
        },
    },
    {
      key: 'connect',
      value:
        /**
         * 连接websocket
         */
        function connect() {
          this.reconnectTimes = 0;
          this.connectWs();
        },
    },
  ]);

  return Socket;
})();

var _default = Socket;
exports.default = _default;
