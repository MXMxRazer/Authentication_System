import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type HeaderType = {
    headers: {
        authorization: string;
    };
};

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: HeaderType = context.switchToHttp().getRequest();
        const token = req.headers.authorization;

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: 'secret',
            });
            req['user'] = payload;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}
