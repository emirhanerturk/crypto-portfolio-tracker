import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { Portfolio } from '@models/portfolio.model';
import { PortfolioStore } from '@stores/portfolio.store';
import { Price } from '@models/price.model';
import { PricesStore } from '@stores/prices.store';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  portfolios: Portfolio[];
  prices: { [symbol: string]: Price };
  lastUpdatedDate: dayjs.Dayjs;
  timeFromLastUpdated: Observable<string>;

  constructor(
    private portfolioStore: PortfolioStore,
    private pricesStore: PricesStore
  ) { }

  ngOnInit(): void {

    this.portfolioStore.portfolioHasAssets$.subscribe(data => {
      this.portfolios = data;
    });

    this.pricesStore.pricesObject$.subscribe(data => {
      this.prices = data;
    });

    this.pricesStore.lastUpdated$.subscribe(data => {
      this.lastUpdatedDate = dayjs(data);
    });

    this.timeFromLastUpdated = interval(1000).pipe(
      map(() => this.lastUpdatedDate ? this.lastUpdatedDate.fromNow() : '-'),
      distinctUntilChanged()
    );

  }

}
