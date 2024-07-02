import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    updateUser(id: string, user: User): Promise<User>;
    deleteById(id: string): Promise<{
        message: string;
    }>;
}
