import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    updateUser(id: any, user: User): Promise<User>;
    create(userDto: CreateUserDto): Promise<User>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
