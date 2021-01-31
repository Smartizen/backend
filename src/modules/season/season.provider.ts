import { Season } from './entities/season.entity';

export const seasonProviders = [
  { provide: 'SeasonRepository', useValue: Season },
];
