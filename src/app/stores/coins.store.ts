

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coin } from '@models/coin.model';

@Injectable({
  providedIn: 'root'
})
export class CoinsStore {

  private readonly store = new BehaviorSubject<Coin[]>([]);

  readonly coins$ = this.store.asObservable();

  getCoins(): Coin[] {
    return this.store.getValue();
  }

  searchCoins(key: string): Coin[] {
    const coins = this.store.getValue();
    return coins.filter(c => c.symbol.toString().toLowerCase().includes(key) || c.name.toString().toLowerCase().includes(key))
  }

  getCoinBySymbol(symbol: string): Coin {
    return this.store.getValue().find(s => s.symbol === symbol);
  }

  getCoinById(id: string): Coin {
    return this.store.getValue().find(s => s.id === id);
  }

  setCoins(coins: Coin[]): void {
    this.store.next(coins);
  }

  clearCoins(): void {
    this.setCoins([]);
  }

}
