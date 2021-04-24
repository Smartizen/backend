import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Manage } from '../../modules/manage/entities/manage.entity';
import { Season } from '../../modules/season/entities/season.entity';
import { Device } from '../../modules/device/entities/device.entity';
import { DeviceType } from '../../modules/device-type/entities/device-type.entity';
import { Function } from '../../modules/function/entities/function.entity';
import { Feature } from '../../modules/feature/entities/feature.entity';
import { Active } from '../../modules/active/entities/active.entity';
import { House } from '../../modules/house/entities/house.entity';
import { Room } from '../../modules/room/entities/room.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Manage,
        House,
        Season,
        Room,
        Device,
        DeviceType,
        Function,
        Feature,
        Active,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
