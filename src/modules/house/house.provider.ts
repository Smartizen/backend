import { House } from './entities/house.entity';

export const houseProviders = [{ provide: 'HouseRepository', useValue: House }];
