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
import { ManageService } from './manage.service';
import { UpdateManageDto } from './dto/update-manage.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SignUpDto } from '../auth/dto/auth.dto';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { User } from '../users/user.entity';

@ApiTags('Manage')
@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() signUpDto: SignUpDto, @GetUser() user: User) {
    return this.manageService.create(signUpDto, user.id);
  }

  @ApiOperation({ summary: 'Get All Staff' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('allStaff')
  getAllStaff(@GetUser() user: User) {
    return this.manageService.getAllStaff(user.id);
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
