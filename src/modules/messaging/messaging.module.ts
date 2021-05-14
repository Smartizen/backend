import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { messagingProviders } from './messaging.provider';
import { DeviceModule } from '../device/device.module';
import { NotificationModule } from '../notification/notification.module';
@Module({
  imports: [DatabaseModule, DeviceModule, NotificationModule],
  controllers: [MessagingController],
  providers: [MessagingService, ...messagingProviders],
})
export class MessagingModule {}
