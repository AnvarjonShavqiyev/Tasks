import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ImATeapotException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = [
    'http://localhost:3001',
  ];
  app.enableCors({
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: function(origin, callback){
      if(!origin){
        callback(null, true);
        return
      }
      if(whitelist.includes(origin)){
        callback(null, true)
      }else{
        callback(new ImATeapotException('Not allowed by cors'), false)
      }
    }
  });

  await app.listen(3000);
}
bootstrap();
