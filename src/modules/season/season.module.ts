import { Module, HttpModule } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { seasonProviders } from './season.provider';
import { CropModule } from '../crop/crop.module';
import { ActiveModule } from '../active/active.module';

@Module({
  imports: [DatabaseModule, CropModule, ActiveModule, HttpModule],
  controllers: [SeasonController],
  providers: [SeasonService, ...seasonProviders],
})
export class SeasonModule {}
