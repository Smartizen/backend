import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { User } from './user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User analytics' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/byUnit')
  countUser(@Query('unit') unit: String, @GetUser() user: User) {
    return this.usersService.countUser(user, unit);
  }

  @ApiOperation({ summary: 'Admin get all user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/getall')
  findAll(@GetUser() user: User) {
    return this.usersService.findAll(user);
  }

  @ApiOperation({ summary: 'Detail of one user' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return 'get user data';
    // return this.usersService.findOne(id, user.id);
  }

  // @Put(':id')
  // update(@Param('id') id: string) {
  //   return 'change user data';
  //   // return this.usersService.update(+id, updateRoomDto);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return 'remove user';
    // return this.usersService.remove(id, user.id);
  }
}
