import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy, JwtRefreshStrategy } from "./jwt.strategy";
import { RefreshTokenService } from "./refresh-token.service";
import { UserService } from "./user.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({})
  ],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy, RefreshTokenService, UserService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
