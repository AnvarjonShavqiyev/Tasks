import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ActivityLogInterceptor } from './common/interceptors/activity-log.interceptor';
import { ActivityLogService } from './activity-log/activity-log.service';
import { UserService } from './users/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  const activityLogService = app.get(ActivityLogService);
  const userService = app.get(UserService);
  const configService = app.get(ConfigService);
  const authService = app.get(AuthService);
  app.useGlobalInterceptors(new ActivityLogInterceptor(activityLogService, userService, configService, authService));
  await app.listen(3000);
}
bootstrap();
