import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { buyProviders } from './buy.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BuyController],
  providers: [BuyService, ...buyProviders],
})
export class BuyModule {}
