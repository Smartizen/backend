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
import { ActiveService } from './active.service';
import { CreateActiveDto } from './dto/create-active.dto';
import { UpdateActiveDto } from './dto/update-active.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';

@ApiTags('Active')
@Controller('active')
export class ActiveController {
  constructor(private readonly activeService: ActiveService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDeviceBelongDto: CreateActiveDto,
    @GetUser() user: User,
  ) {
    return this.activeService.create(createDeviceBelongDto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  findAll(@Param('roomId') roomId: string, @GetUser() user: User) {
    return this.activeService.findAllDeviceInRoom(roomId, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateActiveDto: UpdateActiveDto) {
    return this.activeService.update(+id, updateActiveDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activeService.remove(id);
  }
}
