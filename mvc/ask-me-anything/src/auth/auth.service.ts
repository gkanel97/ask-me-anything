import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokenService } from "../refresh-token/refresh-token.service";
import { jwtConstants } from "./constants";

// The following functions are called by the controller after a passport
// strategy has returned.

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refTokenService: RefreshTokenService
  ) {}

  // validateUser checks the credentials given by a user
  async validateUser (username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      return user.id;
    }
    else {
      return null;
    }
  }

  // When a user logs in, two tokens are generated; one token for accessing restricted
  // services and one for refreshing. The tokens are signed by different keys and the
  // access token expires more quickly.
  async generateInitialTokens(userId: string) {
    const access_payload = { uuid: userId };
    const refresh_payload = { uuid: userId, identifier: bcrypt.hashSync(Date.now().toString(), 5).substr(7) };

    await this.refTokenService.saveToken(refresh_payload);

    return {
      access_token: this.jwtService.sign(access_payload, { secret:jwtConstants.access_secret, expiresIn: '5h' }),
      refresh_token: this.jwtService.sign(refresh_payload, { secret:jwtConstants.refresh_secret, expiresIn: '30d' })
    };
  }

  // refreshAccessToken refreshes an access token before it expires, so that the user does not log out
  async refreshAccessToken({ uuid, identifier }) {
    const check = await this.refTokenService.verifyUserToken(uuid, identifier);

    if(check) {
      const access_payload = { uuid: uuid };
      return {
        access_token: this.jwtService.sign(access_payload, { secret:jwtConstants.access_secret, expiresIn: '5m' })
      }
    }
    else {
      throw new UnauthorizedException();
    }
  }

  async cancelToken({ uuid, identifier }): Promise<void> {
    return this.refTokenService.deleteToken(uuid, identifier);
  }

  async cancelAllTokens(uuid): Promise<void> {
    return this.refTokenService.deleteAllTokens(uuid);
  }

}
