import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards, Query, UseInterceptors, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt.auth.guard'; 
import { Role } from './role.enum';
import { Roles } from '../auth/decorators/roles.decorator.ts/roles.decorator.ts.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard.ts.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.servise';

@Roles(Role.ADMIN)
@Controller('users')
@UseGuards(JwtAuthGuard) 
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('search')
  async search(@Query('q') query:string): Promise<User[]> {
    return this.userService.searchUsers(query);
  } 

  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
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

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    await this.userService.updateImageUrl(id, uploadResult.secure_url);
    const thisUser = await this.userService.findById(id)
    return { thisUser };
  }
}
