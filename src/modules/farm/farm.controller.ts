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
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFarmDto: CreateFarmDto, @GetUser() user: User) {
    return this.farmService.create(createFarmDto, user.id);
  }

  @Get()
  findAll() {
    return this.farmService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('myFarm')
  findAllMyFarm(@GetUser() user: User) {
    return this.farmService.findAllMyFarm(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmService.remove(+id);
  }
}
