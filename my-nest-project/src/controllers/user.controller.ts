import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { User } from '../entites/user.entity'; 

@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    @Get(':id')
    async findUserById(@Param('id') id: any): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    @Get('getByEmail/:email')
    async findUserByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }
    
    
    @Post()
    async createUser(@Body() user: User): Promise<User> {
        try {
            const newUser = await this.userRepository.save(user);
            return newUser;
        } catch (error) {
            throw new BadRequestException('Failed to create user');
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: any, @Body() user: User): Promise<User> {
        try {
            const updateResult: UpdateResult = await this.userRepository.update(id, user);

            if (updateResult.affected === 0) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return await this.userRepository.findOne({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Failed to update user');
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<{id:string, message: string }> {
        try {
            const deleteResult: DeleteResult = await this.userRepository.delete(id);

            if (deleteResult.affected === 0) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return { id, message: 'Deleted!' };
        } catch (error) {
            throw new BadRequestException('Failed to delete user');
        }
    }
}
