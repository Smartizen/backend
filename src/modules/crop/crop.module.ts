import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { cropProviders } from './crop.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CropController],
  providers: [CropService, ...cropProviders],
})
export class CropModule {}
