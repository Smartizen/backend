import { Module, HttpModule } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { seasonProviders } from './season.provider';
import { ActiveModule } from '../active/active.module';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [DatabaseModule, RoomModule, ActiveModule, HttpModule],
  controllers: [SeasonController],
  providers: [SeasonService, ...seasonProviders],
})
export class SeasonModule {}
