import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivityLogService } from '../../activity-log/activity-log.service';
import { UserService } from '../../users/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { getDiscreption, getTime } from '../helpers';

@Injectable()
export class ActivityLogInterceptor implements NestInterceptor {
  constructor(
    private readonly activityLogService: ActivityLogService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly AuthService: AuthService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const { email } = request.body;
    const body = request.body;
    const { method, originalUrl, params } = request;
    try {
      let user;
      if(method === 'POST' && originalUrl === '/auth/signup'){
        const newUser = await this.AuthService.signUp(body);
        user = newUser;
      } else if (email) {
        user = await this.userService.findByEmail(email);
      } else if (params.id){
        user = await this.userService.findById(params.id);
      }else{
        const token = authHeader.split(' ')[1];
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        const userId = decoded.userId;
        user = await this.userService.findById(userId);
      }
      if (!user) {
        throw new UnauthorizedException('Invalid token or email');
      }
      request.user = user;
      return next.handle().pipe(
        tap(() => {
          const { user, method, originalUrl } = request;
          const activityType = `${method}`;
          const description = getDiscreption(method, originalUrl, params.id);
          const time = getTime();

          if (user) {
            this.activityLogService.createLog(user, activityType, description, time);
          }
        }),
      );
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
