import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import gcm from 'node-gcm';
import { SendTokenDto } from './dto/send-token.dto';
import { Messaging } from './entities/messaging.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { DeviceService } from '../device/device.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class MessagingService {
  constructor(
    @Inject('MessagingRepository')
    private readonly messagingRepository: typeof Messaging,

    private readonly deviceService: DeviceService,
    private readonly notificationService: NotificationService,
  ) {}

  async sendMessage(sendMessageDto: SendMessageDto) {
    // Step 1 :
    let { deviceId, title, body } = sendMessageDto;
    let { tokensArray, memberIds } = await this.deviceService.getOwnerOfDevice(
      deviceId,
    );
    // Step 2 :

    //Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
    var sender = new gcm.Sender(process.env.FCM_SERVER_KEY);

    // Prepare a message to be sent
    var gcmMessage = new gcm.Message();
    gcmMessage.addNotification('title', title);
    gcmMessage.addNotification('body', body);

    // Actually send the message
    sender.send(gcmMessage, { registrationTokens: tokensArray }, function(
      err,
      response,
    ) {
      if (err) console.error(err);
      else console.log(response);
    });

    // Step 3 update notificaiton
    memberIds.forEach(memberId => {
      // let data = new CreateNotificationDto(memberId, title, body);
      this.notificationService.create(memberId, title, body);
    });
    return { message: 'send notification successfully!' };
  }

  async sendToken(sendTokenDto: SendTokenDto, userId: string) {
    let { token, platform } = sendTokenDto;
    const isAlreadyHave = await this.messagingRepository.findOne({
      where: { token, userId },
    });
    if (!isAlreadyHave) {
      const message = new Messaging();
      message.token = token;
      message.platform = platform;
      message.userId = userId;

      let newMessage = await message.save();
      return newMessage;
    } else {
      throw new HttpException(
        {
          message: 'token already in database',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
