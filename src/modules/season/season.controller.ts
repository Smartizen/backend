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
import { SeasonService } from './season.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { User } from '../users/user.entity';

@ApiTags('Season')
@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto, @GetUser() user: User) {
    return this.seasonService.create(createSeasonDto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':seasonId')
  close(
    @Body() createSeasonDto: CreateSeasonDto,
    @Param('seasonId') seasonId: string,
    @GetUser() user: User,
  ) {
    return this.seasonService.close(createSeasonDto, user.id, seasonId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':cropId')
  findAllSeasonOfCrop(@Param('cropId') cropId: string, @GetUser() user: User) {
    return this.seasonService.findAllSeasonOfCrop(cropId, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
    return this.seasonService.update(+id, updateSeasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonService.remove(+id);
  }
}
