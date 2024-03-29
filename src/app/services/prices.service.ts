import { Injectable } from '@angular/core';
import { Price } from '@models/price.model';
import { CoinsStore } from '@stores/coins.store';
import { PortfolioStore } from '@stores/portfolio.store';
import { PricesStore } from '@stores/prices.store';
import { CoinGeckoService } from './coingecko.service';
import { BalanceStore } from '@stores/balance.store';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  interval: any;
  intervalMinute = 1;

  constructor(
    private coinGeckoService: CoinGeckoService,
    private portfolioStore: PortfolioStore,
    private pricesStore: PricesStore,
    private coinsStore: CoinsStore,
    private balanceStore: BalanceStore
  ) { }

  async setPrices() {

    const coinIds = this.portfolioStore.getCoinIdsByPortfolio();
    if (!coinIds || !coinIds.length) return;

    try {

      const res = await this.coinGeckoService.getPrices(coinIds);

      const store = Object.keys(res).map(id => {
        const coin = this.coinsStore.getCoinById(id);
        return new Price().deserialize({
          symbol: coin.symbol,
          price: res[id].usd,
          change24h: res[id].usd_24h_change
        });
      });

      this.pricesStore.setPrices(store);
      this.pricesStore.setLastUpdate(new Date());

      this.setStoresByPrices(store);

    } catch (error) {
      console.error('Getting prices failed!', error);
    }

  }

  setStoresByPrices(prices: Price[]): void {

    const portfolios = this.portfolioStore.getPortfolio();
    prices.forEach(price => {
      const portfolio = portfolios.find(p => p.coin.symbol === price.symbol);
      if (portfolio){
        portfolio.setPrice(price);
      }
    });

    this.balanceStore.generateBalance(portfolios);

  }

  startInterval(): void {

    this.stopInterval();
    this.setPrices();
    this.interval = setInterval(() => {
      this.setPrices();
    }, this.intervalMinute * 60 * 1000)

  }

  stopInterval(): void {

    if (this.interval){
      clearInterval(this.interval);
    }

  }

  setIntervalMinute(min: number): void {
    this.intervalMinute = min;
  }

}
