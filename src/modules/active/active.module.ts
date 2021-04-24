import { Module } from '@nestjs/common';
import { ActiveService } from './active.service';
import { ActiveController } from './active.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { activeProviders } from './active.provider';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [DatabaseModule, RoomModule],
  controllers: [ActiveController],
  providers: [ActiveService, ...activeProviders],
  exports: [ActiveService],
})
export class ActiveModule {}
