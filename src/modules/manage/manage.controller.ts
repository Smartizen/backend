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
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SignUpDto } from '../auth/dto/auth.dto';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { User } from '../users/user.entity';
import { use } from 'passport';

@ApiTags('Manage')
@Controller('manage')
export class ManageController {
  constructor(private readonly manageService: ManageService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('createNew/:farmId')
  create(
    @Body() signUpDto: SignUpDto,
    @Param('farmId') farmId: string,
    @GetUser() user: User,
  ) {
    return this.manageService.create(signUpDto, user.id, farmId);
  }

  @ApiOperation({ summary: 'Add user by email' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('addByEmail')
  addMember(@Body() createManageDto: CreateManageDto, @GetUser() user: User) {
    return this.manageService.addByEmail(createManageDto, user.id);
  }

  @ApiOperation({ summary: 'Get All Staff In My Farm' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':farmId')
  getAllStaff(@Param('farmId') farmId: string, @GetUser() user: User) {
    return this.manageService.getAllStaff(user.id, farmId);
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
