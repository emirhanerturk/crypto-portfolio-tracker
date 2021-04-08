import { TestBed } from '@angular/core/testing';

import { CoinGeckoService } from './coingecko.service';

describe('CoinGeckoService', () => {
  let service: CoinGeckoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinGeckoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
