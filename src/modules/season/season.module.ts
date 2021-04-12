import { Module, HttpModule } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { seasonProviders } from './season.provider';
import { CropModule } from '../crop/crop.module';
import { DeviceBelongModule } from '../device-belong/device-belong.module';

@Module({
  imports: [DatabaseModule, CropModule, DeviceBelongModule, HttpModule],
  controllers: [SeasonController],
  providers: [SeasonService, ...seasonProviders],
})
export class SeasonModule {}
