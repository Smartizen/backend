import { Injectable, Inject } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { Season } from './entities/season.entity';

@Injectable()
export class SeasonService {
  constructor(
    @Inject('SeasonRepository')
    private readonly seasonRepository: typeof Season,
  ) {}

  create(createSeasonDto: CreateSeasonDto) {
    return 'This action adds a new season';
  }

  findAll() {
    return `This action returns all season`;
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
