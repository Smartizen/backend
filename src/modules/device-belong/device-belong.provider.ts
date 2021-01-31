import { DeviceBelong } from './entities/device-belong.entity';

export const deviceBelongProviders = [
  { provide: 'DeviceBelongRepository', useValue: DeviceBelong },
];
