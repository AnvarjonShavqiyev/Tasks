import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      database:'Users',
      entities:[User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
})
export class AppModule {}
