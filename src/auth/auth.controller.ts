import { Body, Controller, Get, Header, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as credentialsInterface from './credentials/credentials.interface';
import type { Request } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({default: {limit: 5, ttl: 15 * 60_000}}) // 5 requests per 15 minutes
  @Post('login')
  login(@Body() credentials: credentialsInterface.Credentials){
    return this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() credentials: {email: string, password: string}){
    return this.authService.register(credentials);
  }

  @Get('me')
  @Header('Cache-Control', 'no-store')
  me(@Req() req: Request){
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) throw new UnauthorizedException();
    return this.authService.auth(token);
  }



}
