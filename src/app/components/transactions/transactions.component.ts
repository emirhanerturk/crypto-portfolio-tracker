import { Component, OnInit } from '@angular/core';
import { Coin } from '@models/coin.model';
import { CoinsStore } from '@stores/coins.store';
import { TransactionService } from '@services/transaction.service';
import { Transaction } from '@models/transaction.model';
import { ETransactionType } from '@enums/transaction-type.enum';
import { CoinGeckoService } from '@services/coingecko.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  coins: Coin[];
  transactions: Transaction[];

  openedTransationCreate = false;

  formValues = {
    coinId: '',
    type: 1,
    amount: '',
    price: '',
  };

  placeholderPrice = 'Price';

  ETransactionType = ETransactionType;

  constructor(
    private coinStore: CoinsStore,
    private transactionService: TransactionService,
    private coinGeckoService: CoinGeckoService
  ) { }

  ngOnInit(): void {

    // transactions
    this.getTransations();

    // coins
    this.coinStore.coins$.subscribe(coins => {
      this.coins = coins;
    });

  }

  async selectCoin(event: any): Promise<void> {
    const coinId = event.target.value;
    if (!coinId) return;

    try {
      const res = await this.coinGeckoService.getPrices([coinId]);

      if (res && res[coinId]){
        this.placeholderPrice = res[coinId].usd.toString()
        this.formValues.price = this.placeholderPrice;
      }

    } catch (error) { }

  }

  getTransations(): void {
    this.transactions = this.transactionService.getTransactions();
    this.transactions.reverse();
  }

  createTransaction(): void {

    const input = {
      id: this.formValues.coinId,
      type: Number(this.formValues.type),
      assets: Number(this.formValues.amount),
      price: Number(this.formValues.price),
      date: new Date().getTime()
    };
    const transaction = new Transaction().deserialize(input);
    this.transactionService.createTransaction(transaction);
    this.openedTransationCreate = false;
    this.getTransations();

  }

  deleteTransaction(unix: number): void {
    this.transactionService.deleteTransaction(unix);
    this.getTransations();
  }

}
