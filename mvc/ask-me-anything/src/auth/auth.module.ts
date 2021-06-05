import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { RefreshTokenService } from "../refresh-token/refresh-token.service";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({secret: jwtConstants.secret, signOptions: { expiresIn: '30m' }})
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
