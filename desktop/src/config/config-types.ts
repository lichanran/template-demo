export interface Config {
    hosts: {
        base: string
    },
    /** 接口请求成功时的code */
    successCode?: string | number;
}