import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { houseProviders } from './house.provider';
import { DatabaseModule } from '../../core/database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [HouseController],
  providers: [HouseService, ...houseProviders],
})
export class HouseModule {}
