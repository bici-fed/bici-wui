import http from '../utils/request';
// 下载附件
export const downloadById = (params: any) => {
  return http({
    url: '/file/service/file/downloadById',
    method: 'get',
    data: params,
    quiet: true,
    interceptors: {
      requestInterceptors: (config) => {
        console.log('单个拦截器');
        return config;
      },
    },
  });
};

// 删除附件
export const fileDelete = (params: any) => {
  return http({
    url: '/file/service/file/delete',
    method: 'get',
    data: params,
    quiet: true,
  });
};

export const fetchUpload = (action: string, params: any, token: string) => {
  return http({
    url: action,
    method: 'post',
    data: params,
    quiet: true,
    interceptors: {
      requestInterceptors: (config) => {
        console.log('单个拦截器', config);
        config.headers = { token };
        return config;
      },
    },
  });
};
