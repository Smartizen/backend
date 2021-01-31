import { Module } from '@nestjs/common';
import { OwnService } from './own.service';
import { OwnController } from './own.controller';

@Module({
  controllers: [OwnController],
  providers: [OwnService]
})
export class OwnModule {}
