import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: "postgres://default:ZnU1ztG6ocdg@ep-white-snow-a47lu56s-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
      ssl: { rejectUnauthorized: false }, 
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
})
export class AppModule {}
