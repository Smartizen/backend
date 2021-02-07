import { Module, HttpModule } from '@nestjs/common';
import { DeviceTypeService } from './device-type.service';
import { DeviceTypeController } from './device-type.controller';
import { deviceTypeProviders } from './device-type.provider';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService, ...deviceTypeProviders],
})
export class DeviceTypeModule {}
