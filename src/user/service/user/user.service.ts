import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userRegistrationType } from 'src/dtoTypes/user.info.dto.type';
import { userLoginType } from 'src/dtoTypes/user.login.dto.type';
import { user_auth } from 'src/entities/user.info.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Response } from 'express';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user_auth)
        private readonly userRepo: Repository<user_auth>,
        private readonly jwtService: JwtService,
    ) {}

    getAllUsers() {
        return this.userRepo.find();
    }

    async getUserByUsername(username: string): Promise<user_auth | undefined> {
        const selectedUser = await this.userRepo.findOne({
            where: {
                username,
            },
        });
        delete selectedUser['password'];

        return selectedUser;
    }

    async createUser(userDetails: userRegistrationType) {
        try {
            const hashPassword = await bcrypt.hash(
                userDetails.plainPassword,
                10,
            );

            const user = this.userRepo.create();

            /* eslint-disable */
            let { id, loginAt, password, ...rest } = user;
            /* eslint-enable */

            rest = userDetails;
            delete rest['plainPassword'];
            password = hashPassword;
            const userDbDetails = { ...rest, password };

            if (this.userRepo.save(userDbDetails)) {
                return {
                    status: 'success!',
                };
            }

            return {
                status: 'failed insertion!',
            };
        } catch {
            throw new HttpException(
                'Server Error!',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async checkUser(userDetails: userLoginType, res: Response) {
        const { username, password } = userDetails;
        const searchedUser = this.findUser(null, username, false);

        try {
            const user = await searchedUser;
            const foundUser = user[0];
            if (
                foundUser.username === username &&
                (await bcrypt.compare(password, foundUser.password))
            ) {
                const payload = {
                    sub: foundUser.id,
                    username: foundUser.username,
                };
                const access_token = await this.jwtService.signAsync(payload);
                res.cookie('JWT_Token', access_token, { httpOnly: true });

                return {
                    status: 'success!',
                    access_token,
                };
            }
            throw new UnauthorizedException({
                status: 'failed not authorized!',
            });
        } catch (e) {
            throw new UnauthorizedException({ status: 'failed! bad request!' });
        }
    }

    // httpOnly checks for the usage of data (ie. on front or back)
    async findUser(
        id?: number,
        username?: string,
        httpOnly?: boolean,
    ): Promise<object> {
        const searchedUser = await this.userRepo.find({
            where: {
                username: username,
            },
        });
        if (searchedUser.length >= 1) {
            if (httpOnly) {
                delete searchedUser[0].password;
                return searchedUser;
            }
            return searchedUser;
        }

        throw new HttpException('Data Not Found!', HttpStatus.BAD_REQUEST);
    }

    async clearUser(res: Response) {
        try {
            res.clearCookie('jwt_token');

            return {
                status: 'user cookie cleared!',
            };
        } catch {
            throw new HttpException(
                {
                    status: 'unable to logout!',
                },
                HttpStatus.CONFLICT,
            );
        }
    }
}
