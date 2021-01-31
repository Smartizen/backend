import { Buy } from './entities/buy.entity';

export const buyProviders = [{ provide: 'BuyRepository', useValue: Buy }];
