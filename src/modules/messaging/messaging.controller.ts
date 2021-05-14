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
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../core/guards/jwt.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../../core/decorators/getUser.decorator';
import { SendTokenDto } from './dto/send-token.dto';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Messaging')
@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/send-token')
  sendToken(@Body() sendTokenDto: SendTokenDto, @GetUser() user: User) {
    return this.messagingService.sendToken(sendTokenDto, user.id);
  }

  @ApiBearerAuth()
  @Post('/send-message')
  sendMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messagingService.sendMessage(sendMessageDto);
  }
}
