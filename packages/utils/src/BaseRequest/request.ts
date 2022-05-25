import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

export interface RequestInterceptors {
  // 请求拦截器
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截器
  responseInterceptors?: <T = AxiosResponse>(config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

// 自定义传入参数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}
// 我们使用url做key， key不固定
export interface CancelRequestSource {
  [key: string]: () => void;
}

class BaseRequest {
  // axios实例
  instance: AxiosInstance;
  // 拦截器对象
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

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptorsObj = config.interceptors;
    // 类拦截器
    this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
      console.log('全局请求拦截器');
      return res;
    });

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );
    // 全局拦截器保证最后执行
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res?.data;
      },
      (err: any) => {
        return err;
      },
    );
  }
  request<T>(config: RequestConfig): Promise<T> {
    // 如果我们为单个请求设置拦截器，这里使用单个请求拦截器
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      // url存在保存取消请求方法
      const url = config.url;
      if (url) {
        this.requestUrlList?.push(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelRequestSourceList?.push({
            [url]: c,
          });
        });
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个请求的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors<T>(res);
          }
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  }

  /**
   * @description 获取指定url在cancelRequestSourceList中的索引
   * @param url
   * @private
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url;
    }) as number;
  }
  /**
   * @description 删除requestUrlList和cancelRequestSourceList
   * @param url
   * @private
   */
  private delUrl(url: string) {
    const urlIndex: number = this.requestUrlList?.findIndex((u) => u === url) as number;
    const sourceIndex = this.getSourceIndex(url);
    // 删除url和cancel方法
    urlIndex !== -1 && Array.prototype.splice.call(this.requestUrlList, urlIndex, 1);
    sourceIndex !== -1 && Array.prototype.splice.call(this.cancelRequestSourceList, sourceIndex, 1);
  }

  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];
      source[key]();
    });
  }
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach((u) => {
        const sourceIndex = this.getSourceIndex(u);
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
      });
    }
  }
}

export default BaseRequest;
