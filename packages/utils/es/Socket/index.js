import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
export var ReadyState;

(function (ReadyState) {
  ReadyState[ReadyState["Connecting"] = 0] = "Connecting";
  ReadyState[ReadyState["Open"] = 1] = "Open";
  ReadyState[ReadyState["Closing"] = 2] = "Closing";
  ReadyState[ReadyState["Closed"] = 3] = "Closed";
})(ReadyState || (ReadyState = {})); // 心跳检测
// 心跳重连时候分2种情况：
//   A.正常情况下：websocket.send('HeartBeat') 后，reset()，会先 stop() 后 start()，注意！：stop 只是清了计时器，
//   而 start 没有重新创建新的 WS 实例！，也就是说，正常情况下不会触发 onClose ；
//   B.异常情况下，当 websocket.send('HeartBeat') 触发 onError，会进行尝试重连，这个时候如果“尝试连接”失败，
//   会触发 onClose，此时的 readyState 是 CLOSED；


function heartCheck(type) {
  var _this = this;

  var that = this;
  var _this$options = this.options,
      heartCheckInterval = _this$options.heartCheckInterval,
      debug = _this$options.debug;

  switch (type) {
    case 'start':
      this.heartCheckTimeoutTimer = setTimeout(function () {
        that.instance.send('HeartBeat');
        debug && console.log('WebSocket: Send HeartBeat!');
        heartCheck.call(_this, 'reset');
      }, heartCheckInterval);
      break;

    case 'stop':
      window.clearTimeout(this.heartCheckTimeoutTimer);
      break;

    case 'reset':
      heartCheck.call(this, 'stop');
      heartCheck.call(this, 'start');
      break;

    default:
      break;
  }
}
/**
 * 基本websocket链接类
 */


export var Socket = /*#__PURE__*/function () {
  // websocket连接实例
  // 重连次数
  // 重连定时器
  // 最新消息
  function Socket(socketUrl, options) {
    var _this2 = this;

    _classCallCheck(this, Socket);

    this.options = void 0;
    this.socketUrl = void 0;
    this.instance = void 0;
    this.reconnectTimes = 0;
    this.reconnectTimer = 0;
    this.readyState = ReadyState.Closed;
    this.latestMessage = null;

    this.sendMessage = function (message) {
      if (_this2.readyState === ReadyState.Open) {
        _this2.instance.send(message);
      } else {
        throw new Error('WebSocket disconnected');
      }
    };

    this.disconnect = function () {
      if (_this2.reconnectTimer) {
        clearTimeout(_this2.reconnectTimer);
      }

      _this2.reconnectTimes = _this2.options.reconnectLimit;

      _this2.instance.close();
    };

    this.options = Object.assign({
      reconnectLimit: 3,
      reconnectInterval: 2000,
      manual: false,
      heartCheckInterval: 20000,
      debug: false
    }, options);
    this.socketUrl = socketUrl;

    if (!options.manual) {
      this.init();
    }
  }

  _createClass(Socket, [{
    key: "init",
    value: function init() {
      this.connect();

      if (!this.instance) {
        this.reconnect();
      }
    }
    /**
     * 重新连接
     */

  }, {
    key: "reconnect",
    value: function reconnect() {
      var _this3 = this;

      if (this.reconnectTimes && this.reconnectTimes < this.options.reconnectLimit && this.instance.readyState !== ReadyState.Open) {
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
        }

        this.reconnectTimer = setTimeout(function () {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          _this3.connectWs();

          _this3.reconnectTimes++;
        }, this.options.reconnectInterval);
      }
    }
    /**
     * 连接webscoket
     */

  }, {
    key: "connectWs",
    value: function connectWs() {
      var _this4 = this;

      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
      }

      if (this.instance) {
        this.instance.close();
      }

      var ws = new WebSocket(this.socketUrl);
      this.readyState = ReadyState.Connecting;

      ws.onerror = function (event) {
        var _this4$options$onErro, _this4$options;

        console.log('onerror....');

        _this4.reconnect();

        (_this4$options$onErro = (_this4$options = _this4.options).onError) === null || _this4$options$onErro === void 0 ? void 0 : _this4$options$onErro.call(_this4$options, event, ws);
        _this4.readyState = ws.readyState || ReadyState.Closed;
      };

      ws.onopen = function (event) {
        var _this4$options$onOpen, _this4$options2;

        console.log('onopen....');
        heartCheck.call(_this4, 'start'); //开始心跳检测

        (_this4$options$onOpen = (_this4$options2 = _this4.options).onOpen) === null || _this4$options$onOpen === void 0 ? void 0 : _this4$options$onOpen.call(_this4$options2, event, ws);
        _this4.reconnectTimes = 0;
        _this4.readyState = ws.readyState || ReadyState.Open;
      };

      ws.onmessage = function (message) {
        var _this4$options$onOpen2, _this4$options3;

        console.log('onmessage....');
        heartCheck.call(_this4, 'reset');
        (_this4$options$onOpen2 = (_this4$options3 = _this4.options).onOpen) === null || _this4$options$onOpen2 === void 0 ? void 0 : _this4$options$onOpen2.call(_this4$options3, message, ws);
        _this4.latestMessage = message;
      };

      ws.onclose = function (event) {
        var _this4$options$onClos, _this4$options4;

        console.log('onclose....');
        heartCheck.call(_this4, 'stop');

        _this4.reconnect();

        (_this4$options$onClos = (_this4$options4 = _this4.options).onClose) === null || _this4$options$onClos === void 0 ? void 0 : _this4$options$onClos.call(_this4$options4, event, ws);
        _this4.readyState = ws.readyState || ReadyState.Closed;
      };

      this.instance = ws;
    }
    /**
     *
     * @param message 发送消息
     */

  }, {
    key: "connect",
    value:
    /**
     * 连接websocket
     */
    function connect() {
      this.reconnectTimes = 0;
      this.connectWs();
    }
    /**
     * 取消连接
     */

  }]);

  return Socket;
}();