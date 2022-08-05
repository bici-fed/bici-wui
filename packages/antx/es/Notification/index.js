import "antd/es/notification/style";
import _notification from "antd/es/notification";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";
var keyArr = []; // 存放通知框的key

var delayArr = [8, 5, 2]; // 延时数组

_ConfigProvider.config({
  prefixCls: 'mart'
});

var handleNotificationOpen = function handleNotificationOpen(type, config) {
  var getNewConfig = function getNewConfig() {
    // 根据是否传入description饭后新的配置项
    if (config.description) {
      return config;
    } else if (!config.description && type === 'success' || type === 'error' || type === 'warn' || type === 'info' || type === 'warning') {
      config.description = ' ';
      return config;
    } else {
      config.description = '';
      return config;
    }
  };

  var newConfig = getNewConfig();

  var keyItem = _objectSpread({
    key: "".concat(Date.now()),
    notyType: type
  }, newConfig);

  keyArr.push(keyItem); // 当超过 3 个消息时，顶掉最早的消息

  if (keyArr.length > 3) {
    _notification.close(keyArr[0].key);

    keyArr.shift();
  }

  keyArr.forEach(function (item, index) {
    var key = item.key,
        disableAutoClosed = item.disableAutoClosed; // 设置延时关闭时间

    var toSetDuration = null; // AntD: 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭

    if (!disableAutoClosed) {
      if (index === keyArr.length - 1) {
        toSetDuration = delayArr[0];
      } else if (index === keyArr.length - 2) {
        toSetDuration = delayArr[1];
      } else if (index === 0) {
        toSetDuration = delayArr[2];
      }
    }

    var distConfig = _objectSpread({
      placement: 'topRight',
      duration: toSetDuration,
      onClose: function onClose() {
        var toDeleteIndex = keyArr.findIndex(function (obj) {
          return obj.key === key;
        });
        keyArr.splice(toDeleteIndex, 1);
      }
    }, item);

    switch (item.notyType // 根据类型打开不同样式的消息通知
    ) {
      case 'open':
        _notification.open(distConfig);

        break;

      case 'info':
        _notification.info(distConfig);

        break;

      case 'success':
        _notification.success(distConfig);

        break;

      case 'error':
        _notification.error(distConfig);

        break;

      case 'warn':
        _notification.warn(distConfig);

        break;

      case 'warning':
        _notification.warning(distConfig);

        break;

      case 'close':
        _notification.close(config);

        break;
    }
  });
};

var Notification = {
  open: handleNotificationOpen.bind(this, 'open'),
  info: handleNotificationOpen.bind(this, 'info'),
  success: handleNotificationOpen.bind(this, 'success'),
  error: handleNotificationOpen.bind(this, 'error'),
  warn: handleNotificationOpen.bind(this, 'warn'),
  warning: handleNotificationOpen.bind(this, 'warning'),
  close: handleNotificationOpen.bind(this, 'close')
};
export default Notification;