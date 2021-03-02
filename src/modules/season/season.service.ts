import { Injectable, Inject } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { Season } from './entities/season.entity';
import { CropService } from '../crop/crop.service';

@Injectable()
export class SeasonService {
  constructor(
    @Inject('SeasonRepository')
    private readonly seasonRepository: typeof Season,

    private readonly cropService: CropService,
  ) {}

  async create(createSeasonDto: CreateSeasonDto, userId: string) {
    let { cropId, plant, description } = createSeasonDto;
    if (await this.cropService.isUserOwnCrop(cropId, userId)) {
      let newSeason = new Season({
        cropId,
        plant,
        description,
        startTime: new Date(),
      });
      return await newSeason.save();
    } else {
      return { status: 401, message: "You don't have rights to create season" };
    }
  }

  async close(
    createSeasonDto: CreateSeasonDto,
    userId: string,
    seasonId: string,
  ) {
    let { cropId } = createSeasonDto;
    if (await this.cropService.isUserOwnCrop(cropId, userId)) {
      await this.seasonRepository.update(
        { endTime: new Date() },
        { where: { id: seasonId, cropId } },
      );
      return { status: 200, message: 'Update Successfuly' };
    } else {
      return { status: 401, message: "You don't have rights to create season" };
    }
  }

  async findAllSeasonOfCrop(cropId, userId) {
    if (await this.cropService.isUserOwnCrop(cropId, userId)) {
      let res = await this.seasonRepository.findAll({ where: { cropId } });
      return { status: 200, data: res };
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
