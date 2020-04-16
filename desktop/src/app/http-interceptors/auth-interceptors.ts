import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { LocalStorageService} from "../services/local-storage/local-storage.service"
import { Observable, of, throwError, Subject } from 'rxjs'
import { mergeMap, filter, tap, catchError, throttleTime } from 'rxjs/operators'
import { NzMessageService} from 'ng-zorro-antd/message'
import { Store } from '@ngrx/store'
import { UserStoreActions, UserStoreState} from '../root-store'
import { LoginService } from '../services/login/login.service'

interface Ibody {
    msg: string;
    data: any;
    status: string;
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    triggerLogin$ = new Subject<string>();

    constructor (
        private localStorage: LocalStorageService,
        private message: NzMessageService,
        private userStore$: Store<UserStoreState.State>,
        private loginService: LoginService
    ) {

        this.triggerLogin$
        .pipe(throttleTime(1000))
        .subscribe((msg) => {
            this.message.error( msg || "登录失效，请重新登录");
            this.loginService.signOut();
            this.userStore$.dispatch(UserStoreActions.showLoginModel())
        })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string = this.localStorage.get("token") || "";
        let customHeaders = req.headers.set("Authorization", token)
        let authReq = req.clone({
            headers: customHeaders
        });
        return next.handle(authReq)
            .pipe(
                tap((event: HttpResponse<Ibody>) => {
                    // 上传接口返回的401, 但是httpClient不认为是错误, 处理为HttpHeaderResponse ...
                    if (event.status === 401) {
                        this.triggerLogin$.next("登录失效，请重新登录");
                    }
                }),
                catchError((errRes: HttpErrorResponse, caught) => {
                    if (errRes.status === 401) {
                        this.triggerLogin$.next(errRes.error.msg);
                    }
                    return of ({type: 0})
                }),
            )
    }


}