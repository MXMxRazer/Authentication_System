import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    Post,
    Res,
    Req,
    UseGuards,
} from '@nestjs/common';
import { userRegistration } from 'src/dtos/user.info.dto';
import { UserService } from 'src/user/service/user/user.service';
import { userLogin } from 'src/dtos/user.login.dto';
import { error } from 'console';
import { Response, Request } from 'express';
import { UserGuard } from 'src/user/guard/user/user.guard';

type headerType = {
    cookie: string;
    authorization: string;
};

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(UserGuard)
    @Get()
    async getUser(@Req() req: Request) {
        console.log(req['user']);
        return await this.userService.getAllUsers();
    }

    @Get(':username')
    async getUserByUsername(
        @Param('username') username: string,
        @Headers() headers: headerType,
    ) {
        console.log(headers.authorization);
        return await this.userService.getUserByUsername(username);
    }

    @Post('register')
    async createUser(@Body() userInfo: userRegistration) {
        try {
            return await this.userService.createUser(userInfo);
        } catch {
            // Bad Practice * JUST FOR TESTING *
            throw new error();
        }
    }

    @Post('login')
    checkUser(
        @Body() userInfo: userLogin,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            return this.userService.checkUser(userInfo, res);
        } catch {
            // Bad Practice * JUST FOR TESTING *
            throw new error();
        }
    }

    @Post('logout')
    clearUser(@Res({ passthrough: true }) res: Response) {
        try {
            return this.userService.clearUser(res);
        } catch {
            throw new error();
        }
    }
}
