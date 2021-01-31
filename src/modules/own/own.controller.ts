import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OwnService } from './own.service';
import { CreateOwnDto } from './dto/create-own.dto';
import { UpdateOwnDto } from './dto/update-own.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Own')
@Controller('own')
export class OwnController {
  constructor(private readonly ownService: OwnService) {}

  @Post()
  create(@Body() createOwnDto: CreateOwnDto) {
    return this.ownService.create(createOwnDto);
  }

  @Get()
  findAll() {
    return this.ownService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOwnDto: UpdateOwnDto) {
    return this.ownService.update(+id, updateOwnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownService.remove(+id);
  }
}
