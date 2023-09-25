import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user_auth } from 'src/entities/user.info.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([user_auth]),
        JwtModule.register({
            global: true,
            secret: 'secret',
            signOptions: {
                expiresIn: '1d',
            },
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
