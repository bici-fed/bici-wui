import type { RequestConfig } from '@bici-wui/utils';
declare type CommonRequestConfig = RequestConfig & {
    data?: any;
    quiet?: boolean;
    url?: string;
};
export declare const http: (config: CommonRequestConfig) => Promise<unknown>;
export default http;
