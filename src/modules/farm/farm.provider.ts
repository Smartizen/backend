import { Farm } from './entities/farm.entity';

export const farmProviders = [{ provide: 'FarmRepository', useValue: Farm }];
