import { Injectable } from '@angular/core';
import { EStorage } from '@enums/storage.enum';
import { Coin } from '@models/coin.model';
import { CoinsStore } from '@stores/coins.store';
import { CoinGeckoService } from './coingecko.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(
    private storageService: StorageService,
    private coinGeckoService: CoinGeckoService,
    private coinsStore: CoinsStore,
  ) { }

  setCoinList(): void {

    const success = this.setCoinListFromStorage();
    if (!success){
      this.setCoinListFromAPI();
    }

  }

  setCoinListFromStorage(): boolean {

    let coins = this.storageService.get(EStorage.COINS);
    if (coins){
      coins = coins.map((c: any) => new Coin().deserialize(c));
      this.coinsStore.setCoins(coins);
      return true;
    }
    return false;

  }

  async setCoinListFromAPI(): Promise<void> {

    try {
      const coins = await this.coinGeckoService.getCoinList();
      this.coinsStore.setCoins(coins);
      this.storageService.set(EStorage.COINS, coins.map(c => c.toJSON()));
    } catch (error) {
      Promise.resolve([]);
    }

  }
}
