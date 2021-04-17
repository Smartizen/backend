import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';

@Injectable()
export class FeatureService {
  constructor(
    @Inject('FeatureRepository')
    private readonly featureRepository: typeof Feature,
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    try {
      let feature = new Feature(createFeatureDto);
      let NewFeature = await feature.save();

      return { status: 200, data: NewFeature };
    } catch (error) {
      throw new HttpException(
        {
          message: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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

  remove(id: string) {
    try {
      this.featureRepository.destroy({ where: { id }, force: true });
      return { status: 200, message: 'Delete sucessfully' };
    } catch (error) {
      return { status: 400, message: error };
    }
  }
}
