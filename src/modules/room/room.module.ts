import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { UsersModule } from '../users/users.module';
import { roomProviders } from './room.provider';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [RoomController],
  providers: [RoomService, ...roomProviders],
  exports: [RoomService],
})
export class RoomModule {}
