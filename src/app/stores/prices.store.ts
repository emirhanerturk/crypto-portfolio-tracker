

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Price } from '@models/price.model';

@Injectable({
  providedIn: 'root'
})
export class PricesStore {

  private readonly store = new BehaviorSubject<Price[]>([]);
  private readonly storeLastUpdated = new BehaviorSubject<Date>(null);

  readonly prices$ = this.store.asObservable();
  readonly pricesObject$ = this.store.asObservable()
    .pipe(map(s => {
      return s.reduce((prev, current) => {
        prev[current.symbol] = current;
        return prev;
      }, {});
    }));
  readonly lastUpdated$ = this.storeLastUpdated.asObservable();


  getPrices(): Price[] {
    return this.store.getValue();
  }

  setPrices(prices: Price[]): void {
    this.store.next(prices);
  }

  clearPrices(): void {
    this.setPrices([]);
  }

  setLastUpdate(updatedDate: Date): void {
    this.storeLastUpdated.next(updatedDate);
  }

}
