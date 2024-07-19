import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
import { UserService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const email = createUserDto.email
    const user = await this.userService.findByEmail(email)
    if(!user){
      return this.authService.signUp(createUserDto);
    }else{
      return user
    }
  }

  @Post('login')
  async login(@Body() user: any) {
    return this.authService.login(user);
  }
}
