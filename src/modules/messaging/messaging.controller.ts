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

@ApiTags('Messaging')
@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createMessagingDto: CreateMessagingDto,
    @GetUser() user: User,
  ) {
    return this.messagingService.create(createMessagingDto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/send-token')
  sendToken(@Body() sendTokenDto: SendTokenDto, @GetUser() user: User) {
    return this.messagingService.sendToken(sendTokenDto, user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/send-message')
  sendMessage(@Body() sendTokenDto: SendTokenDto, @GetUser() user: User) {
    return this.messagingService.sendMessage(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAllMessageByUser(@GetUser() user: User) {
    return this.messagingService.findAllMessageByUser(user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messagingService.findOne(+id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateMessagingDto: UpdateMessagingDto) {
  //   return this.messagingService.update(+id, updateMessagingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messagingService.remove(+id);
  // }
}
