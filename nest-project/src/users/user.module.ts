import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { CloudinaryService } from '../cloudinary/cloudinary.servise';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, CloudinaryService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
