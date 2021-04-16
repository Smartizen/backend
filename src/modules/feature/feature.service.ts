import { Injectable, Inject } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeatureService {
  constructor(
    @Inject('FeatureRepository')
    private readonly featureRepository: typeof Feature,
  ) {}

  create(createFeatureDto: CreateFeatureDto) {
    return 'This action adds a new feature';
  }

  findAll() {
    return `This action returns all feature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return `This action updates a #${id} feature`;
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
