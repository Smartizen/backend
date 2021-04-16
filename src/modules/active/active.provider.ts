import { Active } from './entities/active.entity';

export const activeProviders = [
  { provide: 'ActiveRepository', useValue: Active },
];
