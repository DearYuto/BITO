import { Injectable } from '@nestjs/common';

type WalletBalance = {
  asset: string;
  available: number;
};

@Injectable()
export class WalletService {
  private readonly balances: WalletBalance[] = [
    { asset: 'KRW', available: 1000000 },
    { asset: 'BTC', available: 0.5 },
  ];

  getBalances(): WalletBalance[] {
    return this.balances;
  }
}
