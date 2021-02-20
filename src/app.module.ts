import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManageModule } from './modules/manage/manage.module';
import { FarmModule } from './modules/farm/farm.module';
import { SeasonModule } from './modules/season/season.module';
import { CropModule } from './modules/crop/crop.module';
import { DeviceModule } from './modules/device/device.module';
import { DeviceBelongModule } from './modules/device-belong/device-belong.module';
import { BuyModule } from './modules/buy/buy.module';
import { DeviceTypeModule } from './modules/device-type/device-type.module';
import { CommandModule } from './modules/command/command.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ManageModule,
    FarmModule,
    SeasonModule,
    CropModule,
    DeviceModule,
    DeviceBelongModule,
    BuyModule,
    DeviceTypeModule,
    CommandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
