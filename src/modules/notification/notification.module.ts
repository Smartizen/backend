import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { notificationProviders } from './notification.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, ...notificationProviders],
  exports: [NotificationService],
})
export class NotificationModule {}
