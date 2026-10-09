import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { DbService } from '../../db/db.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService, private db : DbService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.split(' ')[1];

        let payload: any;
        try{
            payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
        }catch(error){
            throw new UnauthorizedException();
        }

        if(!payload.jti || await this.db.hasTokenBlacklisted(payload.jti)){
            throw new UnauthorizedException();
        }
    return true;
}


}
