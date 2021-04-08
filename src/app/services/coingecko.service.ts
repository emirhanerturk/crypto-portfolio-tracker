import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Coin } from '@models/coin.model';

interface IPricesResponse {
  [key: string]: {
    usd: number,
    usd_24h_change: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  constructor(
    private http: HttpClient
  ) { }

  async getCoinList(): Promise<Coin[]> {

    return this.http.get<Coin[]>('/coins/list?include_platform=false')
      .pipe(map(d => d.map(c => new Coin().deserialize(c))))
      .toPromise();

  }

  async getPrices(coinIds: string[]): Promise<IPricesResponse> {

    return this.http.get<IPricesResponse>(`/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_change=true`)
      .toPromise();

  }

}
