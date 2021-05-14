import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './core/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManageModule } from './modules/manage/manage.module';
import { SeasonModule } from './modules/season/season.module';
import { DeviceModule } from './modules/device/device.module';
import { DeviceTypeModule } from './modules/device-type/device-type.module';
import { FeatureModule } from './modules/feature/feature.module';
import { ActiveModule } from './modules/active/active.module';
import { FunctionModule } from './modules/function/function.module';
import { RoomModule } from './modules/room/room.module';
import { HouseModule } from './modules/house/house.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ManageModule,
    SeasonModule,
    DeviceModule,
    DeviceTypeModule,
    FunctionModule,
    FeatureModule,
    ActiveModule,
    RoomModule,
    HouseModule,
    MessagingModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
