import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
export interface RequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
export interface CancelRequestSource {
  [index: string]: () => void;
}
/**
 * 请求拦截
 */
export declare class BaseRequest {
  instance: AxiosInstance;
  interceptorsObj?: RequestInterceptors;
  /**
   * 存放取消方法的集合
   * 1、在创建请求后，将取消请求方法push到该集合中
   * 2、封装一个方法，可以取消请求，传入 url:string｜string[]
   * 3、在请求之前判断同一个url是否存在，如果存在就取消请求
   * @param config
   */
  cancelRequestSourceList?: CancelRequestSource[];
  /**
   * 存放所有请求url的集合
   * 1、请求之前将所有的url push到该集合中
   * 2、请求完毕后将url从集合中删除
   * 3、添加在发送请求之前完成，删除在响应之后删除
   */
  requestUrlList?: string[];
  constructor(config: RequestConfig);
  request<T>(config: RequestConfig): Promise<T>;
  /**
   * @description 获取指定url在cancelRequestSourceList中的索引
   * @param url
   * @private
   */
  private getSourceIndex;
  /**
   * @description 删除requestUrlList和cancelRequestSourceList
   * @param url
   * @private
   */
  private delUrl;
  /**
   * 取消全部请求
   */
  cancelAllRequest(): void;
  cancelRequest(url: string | string[]): void;
}
