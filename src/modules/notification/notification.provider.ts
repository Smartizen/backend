import { Notification } from './entities/notification.entity';

export const notificationProviders = [
  { provide: 'NotificationRepository', useValue: Notification },
];
