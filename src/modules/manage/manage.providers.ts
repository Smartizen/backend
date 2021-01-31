import { Manage } from './entities/manage.entity';

export const manageProviders = [
  { provide: 'ManageRepository', useValue: Manage },
];
