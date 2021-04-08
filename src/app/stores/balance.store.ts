import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { Portfolio } from '@models/portfolio.model';
import { Balance } from '@models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceStore {

  private readonly store = new BehaviorSubject<Balance>(null);

  readonly balance$ = this.store.asObservable();

  getBalance(): Balance {
    return this.store.getValue();
  }

  generateBalance(portfolio: Portfolio[]): void {

    const totalCost = _.sumBy(portfolio.filter(p => p.hasLastPrice()), 'cost');
    const totalHoldings = _.sumBy(portfolio.filter(p => p.hasLastPrice()), 'holdings');

    const balance = new Balance({
      balance: totalHoldings,
      cost: totalCost
    });

    this.setBalance(balance);

  }

  setBalance(balance: Balance): void {
    this.store.next(balance);
  }

  clearBalance(): void {
    this.setBalance(null);
  }

}
