import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { farmProviders } from './farm.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FarmController],
  providers: [FarmService, ...farmProviders],
})
export class FarmModule {}
