import { Test, TestingModule } from '@nestjs/testing';
import { DeviceBelongService } from './device-belong.service';

describe('DeviceBelongService', () => {
  let service: DeviceBelongService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceBelongService],
    }).compile();

    service = module.get<DeviceBelongService>(DeviceBelongService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
