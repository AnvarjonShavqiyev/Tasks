import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<import("../users/user.entity").User>;
    login(user: any): Promise<{
        thisUser: import("../users/user.entity").User;
        access_token: string;
    }>;
}
