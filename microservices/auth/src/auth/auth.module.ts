import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtAccessStrategy, JwtRefreshStrategy} from "./jwt.strategy";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.TCP
    }])
  ],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
