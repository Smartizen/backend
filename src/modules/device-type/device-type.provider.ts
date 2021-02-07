import { DeviceType } from './entities/device-type.entity';

export const deviceTypeProviders = [
  { provide: 'DeviceTypeRepository', useValue: DeviceType },
];
