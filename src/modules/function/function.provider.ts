import { Function } from './entities/function.entity';

export const functionProviders = [
  { provide: 'FunctionRepository', useValue: Function },
];
