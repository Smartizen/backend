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
import { DeviceBelongService } from './device-belong.service';
import { CreateDeviceBelongDto } from './dto/create-device-belong.dto';
import { UpdateDeviceBelongDto } from './dto/update-device-belong.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';

@ApiTags('Device  Belong')
@Controller('device-belong')
export class DeviceBelongController {
  constructor(private readonly deviceBelongService: DeviceBelongService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDeviceBelongDto: CreateDeviceBelongDto,
    @GetUser() user: User,
  ) {
    return this.deviceBelongService.create(createDeviceBelongDto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':cropId')
  findAll(@Param('cropId') cropId: string, @GetUser() user: User) {
    return this.deviceBelongService.findAllDeviceInCrop(cropId, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceBelongService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceBelongDto: UpdateDeviceBelongDto,
  ) {
    return this.deviceBelongService.update(+id, updateDeviceBelongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceBelongService.remove(+id);
  }
}
