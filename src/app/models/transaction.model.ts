import { ETransactionType } from "@enums/transaction-type.enum";
import { Deserializable } from "@models/deserializable.model";

export class Transaction extends Deserializable {
  id: string;
  assets: number;
  price: number;
  type: ETransactionType;
  date: number
}
