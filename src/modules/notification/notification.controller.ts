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
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Body() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.create(createNotificationDto);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@GetUser() user: User) {
    return this.notificationService.findAllByUser(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
