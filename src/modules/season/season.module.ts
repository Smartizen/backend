import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { seasonProviders } from './season.provider';
import { CropModule } from '../crop/crop.module';

@Module({
  imports: [DatabaseModule, CropModule],
  controllers: [SeasonController],
  providers: [SeasonService, ...seasonProviders],
})
export class SeasonModule {}
