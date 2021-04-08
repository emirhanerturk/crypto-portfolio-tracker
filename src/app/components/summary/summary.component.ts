import { Component, OnInit } from '@angular/core';
import { Balance } from '@models/balance.model';
import { BalanceStore } from '@stores/balance.store';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  balance: Balance;

  constructor(
    private balanceStore: BalanceStore
  ) { }

  ngOnInit(): void {

    this.balanceStore.balance$.subscribe(data => {
      this.balance = data;
    });

  }

}
