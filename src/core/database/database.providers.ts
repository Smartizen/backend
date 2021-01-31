import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Manage } from '../../modules/manage/entities/manage.entity';
import { Own } from '../../modules/own/entities/own.entity';
import { Farm } from '../../modules/farm/entities/farm.entity';
import { Season } from '../../modules/season/entities/season.entity';
import { Crop } from '../../modules/crop/entities/crop.entity';
// import { DeviceBelong } from 'src/modules/device-belong/entities/device-belong.entity';
// import { Device } from 'src/modules/device/entities/device.entity';
// import { Buy } from 'src/modules/buy/entities/buy.entity';

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
        Own,
        Farm,
        Season,
        Crop,
        // DeviceBelong,
        // Device,
        // Buy,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
