import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { InjectEntityManager } from "@nestjs/typeorm";
import { RefreshTokenService } from "../refresh-token/refresh-token.service";
import { RefreshToken } from "../refresh-token/entities/refresh-token.entity";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refTokenService: RefreshTokenService
  ) {}

  async validateUser (username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      return user.id;
    }
    else {
      return null;
    }
  }

  async generateInitialTokens(userId: number) {
    const payload = { uuid: userId };

    return {
      access_token: this.jwtService.sign(payload, { secret:jwtConstants.access_secret, expiresIn: '5m' }),
      refresh_token: this.jwtService.sign(payload, { secret:jwtConstants.refresh_secret, expiresIn: '30m' })
    };
  }

  async refreshAccessToken(userId: number, token: string) {
    const userEntity = await this.userService.findByUUID(userId);
    if (userEntity && token in userEntity.tokens) {
      const payload = {uuid: userId};
      return {
        access_token: this.jwtService.sign(payload)
      }
    }
    else {
      return null;
    }
  }

  async cancelToken() {

  }
}
