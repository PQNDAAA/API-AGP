import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as credentialsInterface from './credentials/credentials.interface';

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



}
