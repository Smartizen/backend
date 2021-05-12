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
import { DeviceTypeService } from './device-type.service';
import { CreateDeviceTypeDto } from './dto/create-device-type.dto';
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { IsAdmin } from '../../core/guards/IsAdmin.guard';

@ApiTags('Device Type')
@Controller('device-type')
export class DeviceTypeController {
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Post('/watson')
  createIoTWatson(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
    return this.deviceTypeService.createIoTWatson(createDeviceTypeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Post('/smartizen')
  createSmatizen(@Body() createDeviceTypeDto: CreateDeviceTypeDto) {
    return this.deviceTypeService.createSmatizen(createDeviceTypeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get(':platform')
  findAll(@Param('platform') platform: string) {
    return this.deviceTypeService.findAll(platform);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get('allDevice/:id')
  getAllDevice(@Param('id') id: string) {
    return this.deviceTypeService.getAllDevice(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get('allFeature/:id')
  getAllCommand(@Param('id') id: string) {
    return this.deviceTypeService.getAllFeature(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceTypeService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeviceTypeDto: UpdateDeviceTypeDto,
  ) {
    return this.deviceTypeService.update(+id, updateDeviceTypeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, IsAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceTypeService.remove(+id);
  }
}
