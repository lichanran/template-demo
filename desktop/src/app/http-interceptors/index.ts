import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ResponseInterceptor } from './response-interceptor'
import { AuthInterceptor } from './auth-interceptor'

export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },

    // further

]
