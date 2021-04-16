import { Module } from '@nestjs/common';
import { FunctionService } from './function.service';
import { functionProviders } from './function.provider';
import { FunctionController } from './function.controller';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FunctionController],
  providers: [FunctionService, ...functionProviders],
})
export class FunctionModule {}
