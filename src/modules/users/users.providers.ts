import { User } from './user.entity';

export const usersProviders = [
  {
    provide: 'userRepository',
    useValue: User,
  },
];
