import { Component, OnInit } from '@angular/core';
import { Coin } from '@models/coin.model';
import { CoinsStore } from '@stores/coins.store';
import { TransactionService } from '@services/transaction.service';
import { Transaction } from '@models/transaction.model';
import { ETransactionType } from '@enums/transaction-type.enum';

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

  ETransactionType = ETransactionType;

  constructor(
    private coinStore: CoinsStore,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {

    // transactions
    this.getTransations();

    // coins
    this.coinStore.coins$.subscribe(coins => {
      this.coins = coins;
    });

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
