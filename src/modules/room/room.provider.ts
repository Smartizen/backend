import { Room } from './entities/room.entity';

export const roomProviders = [{ provide: 'RoomRepository', useValue: Room }];
