import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { commandProviders } from './command.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CommandController],
  providers: [CommandService, ...commandProviders],
})
export class CommandModule {}
