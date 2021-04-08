import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Portfolio } from '@models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioStore {

  private readonly store = new BehaviorSubject<Portfolio[]>([]);

  readonly portfolio$ = this.store.asObservable();
  readonly portfolioHasAssets$ = this.store.asObservable()
    .pipe(map(b => b.filter(d => d.hasAssets)));

  getPortfolio(): Portfolio[] {
    return this.store.getValue();
  }

  getCoinIdsByPortfolio(): string[] {
    const portfolios = this.store.getValue();
    return portfolios.map(b => b.coin.id);
  }

  setPortfolio(portfolio: Portfolio[]): void {
    this.store.next(portfolio);
  }

  clearPortfolio(): void {
    this.setPortfolio([]);
  }

}
