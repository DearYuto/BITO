import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('ticker')
  getTicker() {
    return this.marketService.getTicker();
  }

  @Get('orderbook')
  getOrderbook() {
    return this.marketService.getOrderbook();
  }
}
