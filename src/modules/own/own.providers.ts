import { Own } from './entities/own.entity';

export const ownProviders = [{ provide: 'OwnRepository', useValue: Own }];
