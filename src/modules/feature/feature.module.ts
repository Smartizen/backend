import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { featureProviders } from './feature.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FeatureController],
  providers: [FeatureService, ...featureProviders],
})
export class FeatureModule {}
