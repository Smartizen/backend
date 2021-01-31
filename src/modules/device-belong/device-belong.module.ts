import { Module } from '@nestjs/common';
import { DeviceBelongService } from './device-belong.service';
import { DeviceBelongController } from './device-belong.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { deviceBelongProviders } from './device-belong.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DeviceBelongController],
  providers: [DeviceBelongService, ...deviceBelongProviders],
})
export class DeviceBelongModule {}
