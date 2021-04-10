import { Pipe, PipeTransform } from '@angular/core';
import { Coin } from '@models/coin.model';
import { CoinsStore } from '@stores/coins.store';

@Pipe({
  name: 'coin'
})
export class CoinPipe implements PipeTransform {

  constructor(
    private coinStore: CoinsStore
  ) { }

  transform(id: string, ): Coin {
    return this.coinStore.getCoinById(id);
  }

}
