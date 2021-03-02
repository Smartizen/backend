import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { cropProviders } from './crop.provider';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [CropController],
  providers: [CropService, ...cropProviders],
  exports: [CropService],
})
export class CropModule {}
