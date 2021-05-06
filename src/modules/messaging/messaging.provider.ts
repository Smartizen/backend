import { Messaging } from './entities/messaging.entity';

export const messagingProviders = [
  { provide: 'MessagingRepository', useValue: Messaging },
];
