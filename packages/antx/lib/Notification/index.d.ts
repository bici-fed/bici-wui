/**
 * @File: 消息通知
 */
declare const Notification: {
    open: (config: any) => void;
    info: (config: any) => void;
    success: (config: any) => void;
    error: (config: any) => void;
    warn: (config: any) => void;
    warning: (config: any) => void;
    close: (config: any) => void;
};
export default Notification;
