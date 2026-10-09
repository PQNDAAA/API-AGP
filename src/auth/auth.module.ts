import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DbService } from '../db/db.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';

@Module({
 imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DbService, JwtAuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
