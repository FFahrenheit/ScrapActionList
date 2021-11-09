import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BlankComponent } from './layouts/blank/blank.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BlankComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
