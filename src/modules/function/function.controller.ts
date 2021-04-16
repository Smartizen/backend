import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FunctionService } from './function.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Function')
@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Post()
  create(@Body() createFunctionDto: CreateFunctionDto) {
    return this.functionService.create(createFunctionDto);
  }

  @Get()
  findAll() {
    return this.functionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFunctionDto: UpdateFunctionDto,
  ) {
    return this.functionService.update(+id, updateFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionService.remove(+id);
  }
}
