import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from '@interceptors/api.interceptor';

import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    PortfolioComponent,
    SummaryComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
