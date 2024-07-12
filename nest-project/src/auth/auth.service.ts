import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token);
      return !!payload;
    } catch (e) {
      return false;
    }
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);
    const newUserDto = { ...createUserDto, password: hashedPassword };
    return this.userService.create(newUserDto);
  }

  async login(user: User) {
    try {
      const thisUser = await this.userService.findByEmail(user.email)
      const payload = { email: thisUser.email, role: thisUser.role };
      const isExist = await this.validateUser(user.email, user.password)
      if(isExist){
        return {
          thisUser,
          access_token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
