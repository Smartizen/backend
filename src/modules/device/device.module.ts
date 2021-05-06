import { Module, HttpModule } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { deviceProviders } from './device.provider';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, HttpModule],
  controllers: [DeviceController],
  providers: [DeviceService, ...deviceProviders],
  exports: [DeviceService],
})
export class DeviceModule {}
