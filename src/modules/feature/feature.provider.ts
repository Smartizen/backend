import { Feature } from './entities/feature.entity';

export const featureProviders = [
  { provide: 'FeatureRepository', useValue: Feature },
];
