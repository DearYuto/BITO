import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { MarketModule } from './market/market.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, WalletModule, MarketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
