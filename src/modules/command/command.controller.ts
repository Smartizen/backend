import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { IsAdmin } from '../../core/guards/IsAdmin.guard';

@ApiTags('Command')
@Controller('command')
export class CommandController {
  constructor(private readonly commandService: CommandService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Post()
  create(@Body() createCommandDto: CreateCommandDto) {
    return this.commandService.create(createCommandDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get()
  findAll() {
    return this.commandService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommandDto: UpdateCommandDto) {
    return this.commandService.update(+id, updateCommandDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandService.remove(id);
  }
}
