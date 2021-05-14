import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: typeof Notification,
  ) {}

  async create(userId: string, title: string, body: string) {
    try {
      const notification = new Notification();
      notification.userId = userId;
      notification.title = title;
      notification.body = body;

      let newNotification = await notification.save();
      return newNotification;
    } catch (error) {
      throw new HttpException(
        {
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllByUser(userId: string) {
    try {
      let noti = await this.notificationRepository.findAll({
        attributes: ['id', 'title', 'body', 'created_at'],
        where: { userId },
        order: [['created_at', 'DESC']],
      });
      return { data: noti };
    } catch (error) {
      throw new HttpException(
        {
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
