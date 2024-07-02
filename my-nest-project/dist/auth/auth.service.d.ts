import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateToken(token: string): Promise<boolean>;
    validateUser(email: string, password: string): Promise<User>;
    signUp(createUserDto: CreateUserDto): Promise<User>;
    login(user: User): Promise<{
        thisUser: User;
        access_token: string;
    }>;
}
