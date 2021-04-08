import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { EStorage } from '@enums/storage.enum';
import { Portfolio } from '@models/portfolio.model';
import { Transaction } from '@models/transaction.model';
import { CoinsStore } from '@stores/coins.store';
import { PortfolioStore } from '@stores/portfolio.store';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private storageService: StorageService,
    private coinsStore: CoinsStore,
    private portfolioStore: PortfolioStore,
  ) { }

  getTransactions(): void {

    let transactions = this.storageService.get(EStorage.TRANSACTIONS);
    if (transactions && transactions.length){

      // convert to models of transactions
      transactions = transactions.map((t: any) => new Transaction().deserialize(t));

      // generate portfolio from the transactions
      const portfolio = this.generatePortfolioFromTransactions(transactions);

      // set the portfolio store
      this.portfolioStore.setPortfolio(portfolio);

    } else {
      console.error('Not found any transaction!')
    }

  }

  generatePortfolioFromTransactions(transactions: Transaction[]): Portfolio[] {

    const symbolsById = _.groupBy(transactions, 'id');

    return Object.keys(symbolsById).map(id => {
      return new Portfolio({
        coin: this.coinsStore.getCoinById(id),
        transactions: symbolsById[id]
      });
    });

  }
}
