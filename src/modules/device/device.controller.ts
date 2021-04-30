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
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { IsAdmin } from '../../core/guards/IsAdmin.guard';

@ApiTags('Device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
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
  @Delete(':typeId/:deviceId')
  remove(@Param('typeId') typeId: string, @Param('deviceId') deviceId: string) {
    return this.deviceService.remove(typeId, deviceId);
  }
}
