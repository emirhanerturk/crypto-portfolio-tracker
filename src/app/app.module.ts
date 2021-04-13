import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ApiInterceptor } from '@interceptors/api.interceptor';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { CoinPipe } from './pipes/coin.pipe';
import { AutocompleteCoinsComponent } from './components/autocomplete-coins/autocomplete-coins.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    PortfolioComponent,
    SummaryComponent,
    TransactionsComponent,
    CoinPipe,
    AutocompleteCoinsComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
