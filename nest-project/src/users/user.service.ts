import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,  
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ users: User[], total: number, pagesCount: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const pagesCount = Math.ceil(total / limit);

    return { users, total, pagesCount };
  }

  async updateUser(id: any, user: User): Promise<User> {
    try {
      if (user.password) {
        user.password = bcrypt.hashSync(user.password, 10);
      }
      const updateResult: UpdateResult = await this.userRepository.update(id, user);
      if (updateResult.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deleteResult: DeleteResult = await this.userRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return { message: 'Deleted!' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete user');
    }
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('user.email ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .getMany();
  }

  async updateImageUrl(id: number, imageUrl: string): Promise<void> {
    await this.userRepository.update(id, { imageUrl });
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET')) as { id: number };
      return await this.userRepository.findOne({ where: { id: decoded.id } });
    } catch (err) {
      return null;
    }
  }
}
