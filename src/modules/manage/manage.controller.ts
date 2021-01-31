import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ManageService } from './manage.service';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manage')
@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}

  @Post()
  create(@Body() createManageDto: CreateManageDto) {
    return this.manageService.create(createManageDto);
  }

  @Get()
  findAll() {
    return this.manageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateManageDto: UpdateManageDto) {
    return this.manageService.update(+id, updateManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageService.remove(+id);
  }
}
