export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  manual?: boolean;
  heartCheckInterval?: number;
  debug?: boolean;
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;

  protocols?: string | string[];
}

export interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage?: WebSocket['send'];
  disconnect?: () => void;
  connect?: () => void;
  readyState: ReadyState;
  webSocketIns?: WebSocket;
}

// 心跳检测
// 心跳重连时候分2种情况：
//   A.正常情况下：websocket.send('HeartBeat') 后，reset()，会先 stop() 后 start()，注意！：stop 只是清了计时器，
//   而 start 没有重新创建新的 WS 实例！，也就是说，正常情况下不会触发 onClose ；
//   B.异常情况下，当 websocket.send('HeartBeat') 触发 onError，会进行尝试重连，这个时候如果“尝试连接”失败，
//   会触发 onClose，此时的 readyState 是 CLOSED；
function heartCheck(this: any, type: 'start' | 'stop' | 'reset') {
  const that = this;
  const { heartCheckInterval, debug } = this.options;
  switch (type) {
    case 'start':
      this.heartCheckTimeoutTimer = setTimeout(() => {
        that.instance.send('HeartBeat');
        debug && console.log('WebSocket: Send HeartBeat!');
        heartCheck.call(this, 'reset');
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
export class Socket {
  options: Options;
  socketUrl: string;
  instance: any; // websocket连接实例
  reconnectTimes: number | undefined = 0; // 重连次数
  reconnectTimer: any = 0; // 重连定时器
  readyState: ReadyState = ReadyState.Closed;
  latestMessage: any = null; // 最新消息
  constructor(socketUrl: string, options: Options) {
    this.options = Object.assign(
      {
        reconnectLimit: 3,
        reconnectInterval: 2000,
        manual: false,
        heartCheckInterval: 20000,
        debug: false,
      },
      options,
    );
    this.socketUrl = socketUrl;
    if (!options.manual) {
      this.init();
    }
  }
  init() {
    this.connect();
    if (!this.instance) {
      this.reconnect();
    }
  }
  /**
   * 重新连接
   */
  reconnect() {
    if (
      this.reconnectTimes &&
      this.reconnectTimes < this.options.reconnectLimit! &&
      this.instance.readyState !== ReadyState.Open
    ) {
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
      }

      this.reconnectTimer = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        this.connectWs();
        this.reconnectTimes!++;
      }, this.options.reconnectInterval);
    }
  }
  /**
   * 连接webscoket
   */
  connectWs() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    if (this.instance) {
      this.instance.close();
    }

    const ws = new WebSocket(this.socketUrl);
    this.readyState = ReadyState.Connecting;

    ws.onerror = (event) => {
      console.log('onerror....');
      this.reconnect();
      this.options.onError?.(event, ws);
      this.readyState = ws.readyState || ReadyState.Closed;
    };
    ws.onopen = (event) => {
      console.log('onopen....');
      heartCheck.call(this, 'start'); //开始心跳检测
      this.options.onOpen?.(event, ws);
      this.reconnectTimes = 0;
      this.readyState = ws.readyState || ReadyState.Open;
    };
    ws.onmessage = (message: WebSocketEventMap['message']) => {
      console.log('onmessage....');
      heartCheck.call(this, 'reset');
      this.options.onOpen?.(message, ws);
      this.latestMessage = message;
    };
    ws.onclose = (event) => {
      console.log('onclose....');
      heartCheck.call(this, 'stop');
      this.reconnect();
      this.options.onClose?.(event, ws);
      this.readyState = ws.readyState || ReadyState.Closed;
    };
    this.instance = ws;
  }

  /**
   *
   * @param message 发送消息
   */
  sendMessage: WebSocket['send'] = (message) => {
    if (this.readyState === ReadyState.Open) {
      this.instance.send(message);
    } else {
      throw new Error('WebSocket disconnected');
    }
  };

  /**
   * 连接websocket
   */
  connect() {
    this.reconnectTimes = 0;
    this.connectWs();
  }
  /**
   * 取消连接
   */
  disconnect = () => {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimes = this.options.reconnectLimit;
    this.instance.close();
  };
}
