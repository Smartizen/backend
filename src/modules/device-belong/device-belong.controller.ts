import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DeviceBelongService } from './device-belong.service';
import { CreateDeviceBelongDto } from './dto/create-device-belong.dto';
import { UpdateDeviceBelongDto } from './dto/update-device-belong.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Device  Belong')
@Controller('device-belong')
export class DeviceBelongController {
  constructor(private readonly deviceBelongService: DeviceBelongService) {}

  @Post()
  create(@Body() createDeviceBelongDto: CreateDeviceBelongDto) {
    return this.deviceBelongService.create(createDeviceBelongDto);
  }

  @Get()
  findAll() {
    return this.deviceBelongService.findAll();
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
