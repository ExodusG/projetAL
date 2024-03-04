import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {ApiBody, ApiSecurity} from "@nestjs/swagger";
import {UserLogin} from "../users/userLogin";

@ApiSecurity('local')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiBody({  type: UserLogin, })
    @Post("login")
    @UseGuards(AuthGuard('local'))
    async login(@Request() request) {
        return this.authService.login(request.user);
    }
}
