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

/**
 * 基本websocket链接类
 */
class Socket {
  options: Options;
  socketUrl: string;
  instance: any; // websocket连接实例
  reconnectTimes: number | undefined = 0; // 重连次数
  reconnectTimer: any = 0; // 重连定时器
  readyState: ReadyState = ReadyState.Closed;
  latestMessage: any = null; // 最新消息
  constructor(socketUrl: string, options: Options) {
    this.options = options;
    this.socketUrl = socketUrl;
    if (!options.manual) {
      this.init();
    }
  }
  init() {
    this.connect();
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
      this.reconnect();
      this.options.onError?.(event, ws);
      this.readyState = ws.readyState || ReadyState.Closed;
    };
    ws.onopen = (event) => {
      this.options.onOpen?.(event, ws);
      this.reconnectTimes = 0;
      this.readyState = ws.readyState || ReadyState.Open;
    };
    ws.onmessage = (message: WebSocketEventMap['message']) => {
      this.options.onOpen?.(message, ws);
      this.latestMessage = message;
    };
    ws.onclose = (event) => {
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

export default Socket;
