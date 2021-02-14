import { Injectable, Inject } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { Command } from './entities/command.entity';

@Injectable()
export class CommandService {
  constructor(
    @Inject('CommandRepository')
    private readonly commandRepository: typeof Command,
  ) {}

  create(createCommandDto: CreateCommandDto) {
    return 'This action adds a new command';
  }

  findAll() {
    return `This action returns all command`;
  }

  findOne(id: number) {
    return `This action returns a #${id} command`;
  }

  update(id: number, updateCommandDto: UpdateCommandDto) {
    return `This action updates a #${id} command`;
  }

  remove(id: number) {
    return `This action removes a #${id} command`;
  }
}
