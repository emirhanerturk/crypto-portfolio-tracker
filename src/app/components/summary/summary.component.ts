import { Component, OnInit } from '@angular/core';
import { Balance } from '@models/balance.model';
import { OptionsService } from '@services/options.service';
import { BalanceStore } from '@stores/balance.store';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  masked = false;
  balance: Balance;

  constructor(
    private optionsService: OptionsService,
    private balanceStore: BalanceStore
  ) { }

  ngOnInit(): void {

    this.masked = this.optionsService.getOptions().masked;
    this.optionsService.masked.subscribe(data => {
      this.masked = data;
    });

    this.balanceStore.balance$.subscribe(data => {
      this.balance = data;
    });

  }

}
