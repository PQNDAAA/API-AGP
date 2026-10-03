import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as credentialsInterface from './credentials/credentials.interface';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() credentials: credentialsInterface.Credentials){
    return this.authService.login(credentials);
  }

  @Post('register')
  register(@Body() credentials: {email: string, password: string}){
    return this.authService.register(credentials);
  }

  @Get('me')
  me(@Req() req: Request){
     const token = req.headers.authorization?.split(' ')[1];
     if (!token) throw new UnauthorizedException();
    return this.authService.auth(token);
  }



}
