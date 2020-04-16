export interface Config {
    hosts: {
        base: string
    },
    /** 接口请求成功时的code */
    successCode?: string | number;
    /** 只影响path location 的前缀，也不会影响路由url的比较 */
    baseHref: string;
    /** 是否启用ngrx logger */
    enableActionLogger: boolean;
}