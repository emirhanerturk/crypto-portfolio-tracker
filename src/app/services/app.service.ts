import { Injectable } from '@angular/core';

import { CoinService } from './coin.service';
import { OptionsService } from './options.service';
import { PricesService } from './prices.service';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private coinService: CoinService,
    private transactionService: TransactionService,
    private pricesService: PricesService,
    private optionsService: OptionsService
  ) { }

  initialize(): void {

    this.coinService.setCoinList();
    this.transactionService.generatePortfolioFromTransactions();
    this.pricesService.startInterval();

  }

}
