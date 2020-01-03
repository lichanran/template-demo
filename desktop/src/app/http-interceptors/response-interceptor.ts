import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpResponse,
    HttpRequest,
    HttpErrorResponse,
    HttpResponseBase
} from '@angular/common/http'

import { Observable, of, throwError } from 'rxjs'
import { mergeMap, catchError } from 'rxjs/operators'
import { config } from '../../config'
import { NzMessageService } from 'ng-zorro-antd/message';

const successCode = config.successCode === undefined ? 200 : config.successCode;


// 返回值格式
interface Response {
    status: string;
    data: any;
    list: any [];
    message: string;
}

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(
        private message: NzMessageService
    ) {

    }

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                mergeMap((event: any) => {
                    if (event instanceof HttpResponse) {
                        return this.handleResponse(event)
                    } else {
                        return of(event)
                    }
                }),
                catchError((err: HttpErrorResponse) => this.handleResponse(err))
            )
    }

    // 处理返回值
    handleResponse (event: HttpResponseBase): Observable<any> {
        const status = event.status
        if (status >= 200 && status < 300 || status == 304) {
            // 调整格式， 处理业务错误
            if (event instanceof HttpResponse) {
                // 业务code为正常, 则直接返回数据
                if (event.body.status === successCode) {
                    return of(
                        new HttpResponse(Object.assign(event, {
                            body: event.body.data 
                        }))
                    )
                } else {
                    // 处理业务错误?
                }
            }

            return of(event)
        } else {
            // 处理请求错误
            switch(status) {
                case 401:
                    this.message.error("请求失败: 未授权")
                    break;
                case 400:
                case 403:
                case 404:
                case 500:
                    this.message.error(`请求失败: ${event.statusText}`)
                    break;
                default:
                    if (event instanceof HttpErrorResponse) {
                        // 未知错误
                        console.warn("未知错误, 大部分是由于后端不支持CORS或无效配置引起", event)
                        this.message.error("请求失败: 未知错误")
                    }
            }
            return throwError(event)
        }

    }

}

