export declare enum ReadyState {
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
/**
 * 基本websocket链接类
 */
export declare class Socket {
  options: Options;
  socketUrl: string;
  instance: any;
  reconnectTimes: number | undefined;
  reconnectTimer: any;
  readyState: ReadyState;
  latestMessage: any;
  constructor(socketUrl: string, options: Options);
  init(): void;
  /**
   * 重新连接
   */
  reconnect(): void;
  /**
   * 连接webscoket
   */
  connectWs(): void;
  /**
   *
   * @param message 发送消息
   */
  sendMessage: WebSocket['send'];
  /**
   * 连接websocket
   */
  connect(): void;
  /**
   * 取消连接
   */
  disconnect: () => void;
}
