import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../users/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const { email } = req.body;
    let user;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      user = await this.userService.validateToken(token);
    }else if(email){
      user = await this.userService.findByEmail(email);
    }
    

    req.user = user;
    next();
  }
}
