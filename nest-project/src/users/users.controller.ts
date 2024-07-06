import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard'; 
import { Role } from './role.enum';
import { Roles } from '../auth/decorators/roles.decorator.ts/roles.decorator.ts.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard.ts.guard';

@Roles(Role.ADMIN)
@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(RolesGuard)
  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @UseGuards(RolesGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUser(id, user);
  }
  
  @UseGuards(RolesGuard)
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<{ message: string }> {
    await this.userService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
