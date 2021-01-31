import { Module } from '@nestjs/common';
import { ManageService } from './manage.service';
import { ManageController } from './manage.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { manageProviders } from './manage.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ManageController],
  providers: [ManageService, ...manageProviders],
})
export class ManageModule {}
