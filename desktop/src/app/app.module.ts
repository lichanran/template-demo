import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from "@angular/common";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ReactiveFormsModule, FormsModule} from '@angular/forms'
// import { AppRoutingModule } from './app-routing.module';

import { config } from '../config/index';
import { httpInterceptorProviders } from './http-interceptors'
import { AppComponent } from './app.component';
import { PopUpComponent } from './kits/components/pop-up/pop-up.component'
import { ScrollbarComponent } from './kits/components/scrollbar/scrollbar.component';

/** angular i18n */
import { registerLocaleData} from '@angular/common'
import zh from '@angular/common/locales/zh';

// 按需加载ng-zorro
// import { NzButtonModule } from 'ng-zorro-antd/button'
// import { NZ_I18N, zh_CN} from 'ng-zorro-antd'


registerLocaleData(zh)

@NgModule({
  declarations: [
    AppComponent,
    ScrollbarComponent,
    PopUpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // ReactiveFormsModule,
    // FormsModule,
    // BrowserAnimationsModule,
    /** 按需加载ng-zorro */
  ],
  providers: [
    httpInterceptorProviders,
    {provide: NZ_I18N, useValue: zh_CN},
    {
      provide:LocationStrategy, 
      useClass: HashLocationStrategy
    },
    {
      provide: APP_BASE_HREF,
      useValue: config.baseHref
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
