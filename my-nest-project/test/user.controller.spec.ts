import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserController } from '../src/controllers/user.controller';
import { User } from '../src/entites/user.entity'
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const result = [new User()];
      jest.spyOn(userRepository, 'find').mockResolvedValue(result);

      expect(await userController.findAllUsers()).toBe(result);
    });
  });

  describe('findUserById', () => {
    it('should return a user', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await userController.findUserById('1')).toBe(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      await expect(userController.findUserById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      expect(await userController.createUser(user)).toBe(user);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 1 } as any);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      expect(await userController.updateUser('1', user)).toBe(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const user = new User();
      jest.spyOn(userRepository, 'update').mockResolvedValue({ affected: 0 } as any);

      await expect(userController.updateUser('1', user)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user and return a message', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      expect(await userController.deleteUser('1')).toEqual({ message: 'Deleted!' });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 0 } as any);

      await expect(userController.deleteUser('1')).rejects.toThrow(NotFoundException);
    });
  });
});
