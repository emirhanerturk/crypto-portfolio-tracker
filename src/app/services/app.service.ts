import { Injectable } from '@angular/core';

import { CoinService } from './coin.service';
import { PricesService } from './prices.service';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private coinService: CoinService,
    private transactionService: TransactionService,
    private pricesService: PricesService
  ) { }

  initialize(): void {

    this.coinService.setCoinList();
    this.transactionService.getTransactions();
    this.pricesService.startInterval();

  }

}
