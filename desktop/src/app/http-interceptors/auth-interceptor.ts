import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http'

import { Observable} from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userId = "admin"

        let authReq = req.clone({
            headers: req.headers.set('currentUserId', userId)
        })
        return next.handle(authReq)
    }


}

