import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const createUserDto = {
        status: 'in triage',
        canDrink: true,
        canEat: true,
        admission: new Date(),
        personalHealthNumber: '9231299312',
      };
      const user = new User();
      mockUserRepository.save.mockResolvedValue(user);

      const result = await service.create(createUserDto, {} as any);
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createUserDto),
      );
      expect(result).toBe(user);
    });
  });

  describe('updateStatus', () => {
    it('should update the status of an existing user', async () => {
      const user = new User();
      user.id = '1';
      mockUserRepository.findOne.mockResolvedValue(user);
      const updateUserDto = { status: 'inactive' };

      const result = await service.updateStatus('1', updateUserDto);
      expect(result.status).toBe(updateUserDto.status);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(
        service.updateStatus('1', { status: 'inactive' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the user if exists', async () => {
      const user = new User();
      user.id = '1';
      mockUserRepository.findOne.mockResolvedValue(user);
      const result = await service.remove('1');
      expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
      expect(result).toBe(undefined);
    });
  });
});
