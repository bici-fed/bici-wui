import http from '../utils/request'; // 下载附件

export var downloadById = function downloadById(params) {
  return http({
    url: '/file/service/file/downloadById',
    method: 'get',
    data: params,
    quiet: true,
    interceptors: {
      requestInterceptors: function requestInterceptors(config) {
        console.log('单个拦截器');
        return config;
      }
    }
  });
}; // 删除附件

export var fileDelete = function fileDelete(params) {
  return http({
    url: '/file/service/file/delete',
    method: 'get',
    data: params,
    quiet: true
  });
};
export var fetchUpload = function fetchUpload(action, params, token) {
  return http({
    url: action,
    method: 'post',
    data: params,
    quiet: true,
    interceptors: {
      requestInterceptors: function requestInterceptors(config) {
        console.log('单个拦截器', config);
        config.headers = {
          token: token
        };
        return config;
      }
    }
  });
};