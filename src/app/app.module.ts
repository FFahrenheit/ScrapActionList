import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BlankComponent } from './layouts/blank/blank.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Error404Component } from './errors/error404/error404.component';
import { PipesModule } from './pipes/pipes.module';
import { Error500Component } from './errors/error500/error500.component';
import { DatePipe, TitleCasePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    DashboardComponent,
    Error404Component,
    Error500Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    SharedModule,
    NgbModule,
    PipesModule.forRoot()
  ],
  providers: [
    DatePipe,
    TitleCasePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
