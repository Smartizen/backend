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
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';

@ApiTags('House')
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createHouseDto: CreateHouseDto, @GetUser() user: User) {
    return this.houseService.create(createHouseDto, user.id);
  }

  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('myHouse')
  findAllMyHouse(@GetUser() user: User) {
    return this.houseService.findAllMyHouse(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(+id, updateHouseDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.houseService.remove(id, user);
  }
}
