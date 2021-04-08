import { Deserializable } from "@models/deserializable.model";
import { CalculatePercentChange } from "@helpers/general.helper";

export class Balance extends Deserializable {
  balance: number;
  change: number;
  profitOrLoss: number;
  lastUpdated: Date;

  private _cost: number;

  constructor(input: { balance: number, cost: number }){
    super();
    this._cost = input.cost;
    this.balance = input.balance;
    this.lastUpdated = new Date();
    this.setChange();
    this.setProfitOrLoss();
  }

  setChange(): void {
    this.change = CalculatePercentChange(this._cost, this.balance);
  }

  setProfitOrLoss(): void {
    this.profitOrLoss = this.balance - this._cost;
  }

  setProfilOrLoss(): void {
    this.profitOrLoss = this.balance - this._cost;
  }

  get isPositiveChange(): boolean {
    return this.change > 0;
  }

  get isNegativeChange(): boolean {
    return this.change < 0;
  }

}
