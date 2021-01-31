import { Crop } from './entities/crop.entity';

export const cropProviders = [{ provide: 'CropRepository', useValue: Crop }];
