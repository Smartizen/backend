import { Module } from '@nestjs/common';
import { OwnService } from './own.service';
import { OwnController } from './own.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { ownProviders } from './own.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OwnController],
  providers: [OwnService, ...ownProviders],
})
export class OwnModule {}
