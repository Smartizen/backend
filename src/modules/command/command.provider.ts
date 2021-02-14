import { Command } from './entities/command.entity';

export const commandProviders = [
  { provide: 'CommandRepository', useValue: Command },
];
