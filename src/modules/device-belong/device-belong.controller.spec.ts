import { Test, TestingModule } from '@nestjs/testing';
import { DeviceBelongController } from './device-belong.controller';
import { DeviceBelongService } from './device-belong.service';

describe('DeviceBelongController', () => {
  let controller: DeviceBelongController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceBelongController],
      providers: [DeviceBelongService],
    }).compile();

    controller = module.get<DeviceBelongController>(DeviceBelongController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
