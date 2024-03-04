import { Test, TestingModule } from '@nestjs/testing';
import { UsersAssociationsService } from './users-associations.service';

describe('UsersAssociationsService', () => {
  let service: UsersAssociationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersAssociationsService],
    }).compile();

    service = module.get<UsersAssociationsService>(UsersAssociationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
