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
import { GetSeasonDataDto } from './dto/get-season-data.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { User } from '../users/user.entity';

@ApiTags('Season')
@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @ApiOperation({ summary: 'Start Season' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto, @GetUser() user: User) {
    return this.seasonService.create(createSeasonDto, user.id);
  }

  @ApiOperation({ summary: 'End Season' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('end')
  close(@Body() getSeasonDataDto: GetSeasonDataDto, @GetUser() user: User) {
    return this.seasonService.close(getSeasonDataDto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  findAllSeasonOfRoom(@Param('roomId') roomId: string, @GetUser() user: User) {
    return this.seasonService.findAllSeasonOfRoom(roomId, user.id);
  }

  @ApiOperation({ summary: 'Get all data in room on season' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('room')
  GetDataOfSeason(
    @Body() getSeasonDataDto: GetSeasonDataDto,
    @GetUser() user: User,
  ) {
    return this.seasonService.GetDataOfSeason(getSeasonDataDto, user.id);
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
