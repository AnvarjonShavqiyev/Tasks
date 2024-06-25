import { Repository } from "typeorm";
import { User } from '../entites/user.entity';
export declare class UserController {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAllUsers(): Promise<User[]>;
    findUserById(id: any): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(id: any, user: User): Promise<User>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
