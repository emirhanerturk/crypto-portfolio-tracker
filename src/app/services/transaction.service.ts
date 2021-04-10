import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { EStorage } from '@enums/storage.enum';
import { Portfolio } from '@models/portfolio.model';
import { Transaction } from '@models/transaction.model';
import { CoinsStore } from '@stores/coins.store';
import { PortfolioStore } from '@stores/portfolio.store';
import { StorageService } from './storage.service';
import { PricesService } from './prices.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private storageService: StorageService,
    private coinsStore: CoinsStore,
    private portfolioStore: PortfolioStore,
    private priceService: PricesService
  ) { }

  getTransactions(): Transaction[] {

    let transactions = this.storageService.get(EStorage.TRANSACTIONS);
    if (transactions && transactions.length){

      // convert to models of transactions
      return transactions.map((t: any) => new Transaction().deserialize(t));

    } else {
      return [];
    }

  }

  generatePortfolioFromTransactions(): void {

    const transactions = this.getTransactions();

    const symbolsById = _.groupBy(transactions, 'id');

    const portfolio = Object.keys(symbolsById).map(id => {
      return new Portfolio({
        coin: this.coinsStore.getCoinById(id),
        transactions: symbolsById[id]
      });
    });

    this.portfolioStore.setPortfolio(portfolio);

  }

  createTransaction(transaction: Transaction): void {

    const transactions = this.storageService.get(EStorage.TRANSACTIONS);
    transactions.push(transaction);
    this.storageService.set(EStorage.TRANSACTIONS, transactions);
    this.generatePortfolioFromTransactions();
    this.priceService.startInterval();

  }

  deleteTransaction(unix: number): void {
    const transactions = this.storageService.get(EStorage.TRANSACTIONS);
    const i = transactions.findIndex(t => t.date === unix);
    if (i !== -1){
      transactions.splice(i, 1);
      this.storageService.set(EStorage.TRANSACTIONS, transactions);
      this.generatePortfolioFromTransactions();
      this.priceService.startInterval();
    }
  }

}
