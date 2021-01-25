import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {ApiInterceptor} from './shared/interceptors/api.interceptor';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {LoaderModule} from './loader/loader.module';
import {NetworkLoadingInterceptor} from './shared/interceptors/network-loading.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    LoaderModule
  ],
  providers: [
    { provide: 'apiBaseUrl', useValue: environment.apiBaseUrl },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkLoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
