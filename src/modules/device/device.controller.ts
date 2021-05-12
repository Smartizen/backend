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
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { CreateDeviceSmartizenDto } from './dto/create-device-smartizen.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ControlDeviceDto } from './dto/control-device.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { IsAdmin } from '../../core/guards/IsAdmin.guard';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { User } from '../users/user.entity';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Post('/watson')
  createWatson(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.createWatson(createDeviceDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Post('/smartizen')
  createSmartizen(@Body() createDeviceSmartizenDto: CreateDeviceSmartizenDto) {
    return this.deviceService.createSmartizen(createDeviceSmartizenDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/command')
  controlDevice(
    @Body() controlDevice: ControlDeviceDto,
    @GetUser() user: User,
  ) {
    return this.deviceService.controlDevice(controlDevice, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Delete('/watson/:typeId/:deviceId')
  removeWatson(
    @Param('typeId') typeId: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.deviceService.removeWatson(typeId, deviceId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Delete('/smartizen/:typeId/:deviceId')
  removeSmartizen(
    @Param('typeId') typeId: string,
    @Param('deviceId') deviceId: string,
  ) {
    return this.deviceService.removeSmartizen(typeId, deviceId);
  }
}
