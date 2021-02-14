import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Manage } from '../../modules/manage/entities/manage.entity';
import { Own } from '../../modules/own/entities/own.entity';
import { Farm } from '../../modules/farm/entities/farm.entity';
import { Season } from '../../modules/season/entities/season.entity';
import { Crop } from '../../modules/crop/entities/crop.entity';
import { DeviceBelong } from '../../modules/device-belong/entities/device-belong.entity';
import { Device } from '../../modules/device/entities/device.entity';
import { DeviceType } from '../../modules/device-type/entities/device-type.entity';
import { Command } from '../../modules/command/entities/command.entity';
import { Buy } from '../../modules/buy/entities/buy.entity';

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
        DeviceBelong,
        Device,
        DeviceType,
        Command,
        Buy,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
