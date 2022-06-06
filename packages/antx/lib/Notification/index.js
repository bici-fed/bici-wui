'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

require('antd/es/notification/style');

var _notification2 = _interopRequireDefault(require('antd/es/notification'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var keyArr = []; // 存放通知框的key

var delayArr = [8, 5, 2]; // 延时数组

var handleNotificationOpen = function handleNotificationOpen(type, config) {
  var getNewConfig = function getNewConfig() {
    if (config.description) {
      return config;
    } else if (
      (!config.description && type === 'success') ||
      type === 'error' ||
      type === 'warn' ||
      type === 'info' ||
      type === 'warning'
    ) {
      config.description = ' ';
      return config;
    } else {
      config.description = '';
      return config;
    }
  };

  var newConfig = getNewConfig();
  var keyItem = (0, _objectSpread2.default)(
    {
      key: ''.concat(Date.now()),
      notyType: type,
    },
    newConfig,
  );
  keyArr.push(keyItem); // 当超过 3 个消息时，顶掉最早的消息

  if (keyArr.length > 3) {
    _notification2.default.close(keyArr[0].key);

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

    var distConfig = (0, _objectSpread2.default)(
      {
        placement: 'bottomLeft',
        duration: toSetDuration,
        onClose: function onClose() {
          var toDeleteIndex = keyArr.findIndex(function (obj) {
            return obj.key === key;
          });
          keyArr.splice(toDeleteIndex, 1);
        },
      },
      item,
    );

    switch (item.notyType) {
      // 根据类型打开不同样式的消息通知
      case 'open':
        _notification2.default.open(distConfig);

        break;

      case 'info':
        _notification2.default.info(distConfig);

        break;

      case 'success':
        _notification2.default.success(distConfig);

        break;

      case 'error':
        _notification2.default.error(distConfig);

        break;

      case 'warn':
        _notification2.default.warn(distConfig);

        break;

      case 'warning':
        _notification2.default.warning(distConfig);

        break;

      case 'close':
        _notification2.default.close(config);

        break;
    }
  });
};

var Notification = {
  open: handleNotificationOpen.bind(void 0, 'open'),
  info: handleNotificationOpen.bind(void 0, 'info'),
  success: handleNotificationOpen.bind(void 0, 'success'),
  error: handleNotificationOpen.bind(void 0, 'error'),
  warn: handleNotificationOpen.bind(void 0, 'warn'),
  warning: handleNotificationOpen.bind(void 0, 'warning'),
  close: handleNotificationOpen.bind(void 0, 'close'),
};
var _default = Notification;
exports.default = _default;
