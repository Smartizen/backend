import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { deviceProviders } from './device.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DeviceController],
  providers: [DeviceService, ...deviceProviders],
})
export class DeviceModule {}
