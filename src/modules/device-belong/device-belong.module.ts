import { Module } from '@nestjs/common';
import { DeviceBelongService } from './device-belong.service';
import { DeviceBelongController } from './device-belong.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { deviceBelongProviders } from './device-belong.provider';
import { CropModule } from '../crop/crop.module';

@Module({
  imports: [DatabaseModule, CropModule],
  controllers: [DeviceBelongController],
  providers: [DeviceBelongService, ...deviceBelongProviders],
})
export class DeviceBelongModule {}
