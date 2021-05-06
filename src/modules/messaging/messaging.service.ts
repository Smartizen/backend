import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import gcm from 'node-gcm';
import { SendTokenDto } from './dto/send-token.dto';
import { Messaging } from './entities/messaging.entity';

@Injectable()
export class MessagingService {
  constructor(
    @Inject('MessagingRepository')
    private readonly messagingRepository: typeof Messaging,
  ) {}

  create(createMessagingDto: CreateMessagingDto, userId: string) {
    return 'This action adds a new messaging';
  }

  sendMessage(userId: string) {
    // Step 1 : query all token of user
    // Step 2 :

    // //Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
    // var sender = new gcm.Sender(process.env.FCM_SERVER_KEY);

    // // Prepare a message to be sent
    // var gcmMessage = new gcm.Message();
    // gcmMessage.addNotification('title', 'You have received push notification!');
    // gcmMessage.addNotification('body', message);

    // // Actually send the message
    // sender.send(gcmMessage, { registrationTokens: tokensArray }, function(
    //   err,
    //   response,
    // ) {
    //   if (err) console.error(err);
    //   else console.log(response);
    // });

    return 'tesstt';
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

  findAllMessageByUser(userId: string) {
    return 'tesstt';
  }

  findAll() {
    return `This action returns all messaging`;
  }

  findOne(id: number) {
    return `This action returns a #${id} messaging`;
  }

  update(id: number, updateMessagingDto: UpdateMessagingDto) {
    return `This action updates a #${id} messaging`;
  }

  remove(id: number) {
    return `This action removes a #${id} messaging`;
  }
}
