import { Injectable } from '@nestjs/common';

type MarketTicker = {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
};

type MarketOrderbook = {
  bids: { price: number; size: number }[];
  asks: { price: number; size: number }[];
};

@Injectable()
export class MarketService {
  private readonly ticker: MarketTicker = {
    symbol: 'BTC/KRW',
    price: 67000000,
    change24h: -1.2,
    volume24h: 123.45,
  };

  private readonly orderbook: MarketOrderbook = {
    bids: [{ price: 66900000, size: 0.2 }],
    asks: [{ price: 67100000, size: 0.15 }],
  };

  getTicker(): MarketTicker {
    return this.ticker;
  }

  getOrderbook(): MarketOrderbook {
    return this.orderbook;
  }
}
