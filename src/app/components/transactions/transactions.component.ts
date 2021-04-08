import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Coin } from '@models/coin.model';
import { CoinsStore } from '@stores/coins.store';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  coins: Observable<Coin[]>;

  constructor(
    private coinStore: CoinsStore
  ) { }

  ngOnInit(): void {

    this.coins = this.coinStore.coins$;

  }

}
