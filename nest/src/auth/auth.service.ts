import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}


    public async validateUser(id: number, password: string): Promise<User> {
        const user: User = await this.usersService.getUserById(id);

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return undefined;
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
