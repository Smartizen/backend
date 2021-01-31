import { Module } from '@nestjs/common';
import { DeviceBelongService } from './device-belong.service';
import { DeviceBelongController } from './device-belong.controller';

@Module({
  controllers: [DeviceBelongController],
  providers: [DeviceBelongService]
})
export class DeviceBelongModule {}
