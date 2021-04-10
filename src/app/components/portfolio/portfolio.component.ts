import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as _ from "lodash";
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { Portfolio } from '@models/portfolio.model';
import { PortfolioStore } from '@stores/portfolio.store';
import { Price } from '@models/price.model';
import { PricesStore } from '@stores/prices.store';
import { OptionsService } from '@services/options.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  masked = false;

  portfolios: Portfolio[];
  prices: { [symbol: string]: Price };
  lastUpdatedDate: dayjs.Dayjs;
  timeFromLastUpdated: Observable<string>;

  sorting: {
    by: ''|'coin.symbol'|'avgUnitCost'|'assets'|'change'|'profitOrLoss'|'holdings',
    type: boolean
  } = {
    by: '',
    type: true
  };

  constructor(
    private optionsService: OptionsService,
    private portfolioStore: PortfolioStore,
    private pricesStore: PricesStore
  ) { }

  ngOnInit(): void {

    this.masked = this.optionsService.getOptions().masked;
    this.optionsService.masked.subscribe(data => {
      this.masked = data;
    })

    this.portfolioStore.portfolioHasAssets$.subscribe(data => {
      let first = !this.portfolios;
      this.portfolios = data;
      if (first) this.sort('coin.symbol');
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

  sort(sortBy: 'coin.symbol'|'assets'|'avgUnitCost'|'change'|'profitOrLoss'|'holdings'): void {

    if (sortBy === this.sorting.by){
      this.sorting.type = !this.sorting.type;
    }

    this.sorting.by = sortBy;

    this.portfolios.sort((a, b) => {
      if (_.get(a, sortBy) > _.get(b, sortBy)) return 1;
      if (_.get(a, sortBy) < _.get(b, sortBy)) return -1;
      return 0
    });

    if (!this.sorting.type){
      this.portfolios.reverse();
    }

  }

}
