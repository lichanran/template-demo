export interface Config {
    hosts: {
        base: string
    },
    /** 接口请求成功时的code */
    successCode?: string | number;
    /** 发布时dist相对服务器根路径的path, 一般prod需要配 */
    deployUrl: string;
}