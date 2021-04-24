import { Injectable, Inject, HttpService } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { GetSeasonDataDto } from './dto/get-season-data.dto';
import { Season } from './entities/season.entity';
import { ActiveService } from '../active/active.service';
import { RoomService } from '../room/room.service';

@Injectable()
export class SeasonService {
  constructor(
    @Inject('SeasonRepository')
    private readonly seasonRepository: typeof Season,

    private readonly roomService: RoomService,
    private readonly activeService: ActiveService,
    private http: HttpService,
  ) {}

  async create(createSeasonDto: CreateSeasonDto, userId: string) {
    let { roomId, plant, description } = createSeasonDto;
    if (await this.roomService.isUserOwnRoom(roomId, userId)) {
      let newSeason = new Season({
        roomId,
        plant,
        description,
        startTime: new Date(),
      });
      return await newSeason.save();
    } else {
      return { status: 401, message: "You don't have rights to create season" };
    }
  }

  async close(getSeasonDataDto: GetSeasonDataDto, userId: string) {
    let { roomId, seasonId } = getSeasonDataDto;
    if (await this.roomService.isUserOwnRoom(roomId, userId)) {
      await this.seasonRepository.update(
        { endTime: new Date() },
        { where: { id: seasonId, roomId } },
      );
      return { status: 200, message: 'Update Successfuly' };
    } else {
      return { status: 401, message: "You don't have rights to create season" };
    }
  }

  async findAllSeasonOfRoom(roomId, userId) {
    if (await this.roomService.isUserOwnRoom(roomId, userId)) {
      let res = await this.seasonRepository.findAll({ where: { roomId } });
      return { status: 200, data: res };
    } else {
      return { status: 401, message: "You don't have rights to create season" };
    }
  }

  async GetDataOfSeason(getSeasonDataDto: GetSeasonDataDto, userId: string) {
    let { roomId, seasonId } = getSeasonDataDto;
    if (await this.roomService.isUserOwnRoom(roomId, userId)) {
      // get time
      let time = await this.seasonRepository.findOne({
        where: { id: seasonId },
        attributes: ['startTime', 'endTime'],
      });

      // get device
      let devices = await this.activeService.findAllDeviceInRoom(
        roomId,
        userId,
      );
      let deviceId = devices.data.map(data => data.device.deviceId);
      let roomData = await this.http
        .post(process.env.SENSOR_BACKEND_URL + '/data/hour', {
          deviceId,
          from: time.startTime.getTime(),
          to: time.endTime ? time.endTime.getTime() : new Date().getTime(),
        })
        .toPromise();

      return { status: 200, data: roomData.data };
    } else {
      return { status: 401, message: "You don't have rights to create season" };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} season`;
  }

  update(id: number, updateSeasonDto: UpdateSeasonDto) {
    return `This action updates a #${id} season`;
  }

  remove(id: number) {
    return `This action removes a #${id} season`;
  }
}
