import * as _ from "lodash";
import { Deserializable } from "@models/deserializable.model";
import { Coin } from "./coin.model";
import { Transaction } from "./transaction.model";
import { ETransactionType } from "@enums/transaction-type.enum";
import { Price } from "./price.model";
import { CalculatePercentChange } from "@helpers/general.helper";

export class Portfolio extends Deserializable {
  coin: Coin;
  transactions: Transaction[];
  assets: number;
  avgUnitCost: number;
  private _lastPrice: Price;
  private _holdings: number;
  private _cost: number;
  private _change: number;
  private _profitOrLoss: number;

  constructor(input: { coin: Coin, transactions: Transaction[] }){
    super();

    this.coin = input.coin;
    this.transactions = input.transactions;

    this.setAssets();
    this.setAvgUnitCost();
    this.setCost();

  }

  setPrice(price: Price): boolean {
    if (!price) return false;

    this._lastPrice = price;
    this.setHoldings();
    this.setChange();
    this.setProfitOrLoss();

    return true;
  }

  hasLastPrice(): boolean {
    return !!this._lastPrice;
  }

  setAssets(): void {
    const buy = _.sumBy(this.transactions.filter(t => t.type === ETransactionType.BUY), 'assets');
    const sell = _.sumBy(this.transactions.filter(t => t.type === ETransactionType.SELL), 'assets');
    this.assets = Number((buy - sell).toFixed(8));
  }

  setAvgUnitCost(): void {
    let total = 0;
    const weighted = this.transactions
      .filter(t => t.type === ETransactionType.BUY)
      .reduce((prev, current) => {
        total += current.assets;
        return prev += (current.assets * current.price);
      }, 0);
    this.avgUnitCost = Number((weighted / total).toFixed(8));
  }

  get hasAssets(): boolean {
    return this.assets > 0;
  }

  get holdings(): number {
    return this._holdings;
  }

  setHoldings(): void {
    if (!this.hasLastPrice()) return;
    this._holdings = this.assets * this._lastPrice.price;
  }

  get cost(): number {
    return this._cost;
  }

  setCost(): void {
    this._cost = this.assets * this.avgUnitCost;
  }

  get change(): number {
    return this._change;
  }

  setChange(): void {
    if (!this.hasLastPrice()) return;
    this._change = CalculatePercentChange(this.avgUnitCost, this._lastPrice.price);
  }

  get isPositiveChange(): boolean {
    return this._change > 0;
  }

  get isNegativeChange(): boolean {
    return this._change < 0;
  }

  get profitOrLoss(): number {
    return this._profitOrLoss;
  }

  setProfitOrLoss(): void {
    if (!this.hasLastPrice()) return;
    this._profitOrLoss = this.holdings - this._cost;
  }

}
