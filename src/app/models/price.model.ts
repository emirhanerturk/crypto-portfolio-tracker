import { Deserializable } from "@models/deserializable.model";

export class Price extends Deserializable {
  symbol: string;
  price: number;
  change24h: number;

  get isPositiveChange(): boolean {
    return this.change24h > 0;
  }

  get isNegativeChange(): boolean {
    return this.change24h < 0;
  }
}
