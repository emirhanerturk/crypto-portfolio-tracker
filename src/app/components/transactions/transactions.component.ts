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
    private transactionService: TransactionService,
    private coinGeckoService: CoinGeckoService
  ) { }

  ngOnInit(): void {
    this.getTransations();
  }

  async selectCoin(coin: Coin): Promise<void> {

    if (!coin){
      this.formValues.coinId = '';
      this.placeholderPrice = 'Price';
      this.formValues.price = '';
      return;
    };
    this.formValues.coinId = coin.id;

    try {
      const res = await this.coinGeckoService.getPrices([coin.id]);

      if (res && res[coin.id]){
        this.placeholderPrice = res[coin.id].usd.toString();
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
