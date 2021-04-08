import { Deserializable } from "@models/deserializable.model";

export class Coin extends Deserializable {
  id: string;
  name: string;
  symbol: string;
}
