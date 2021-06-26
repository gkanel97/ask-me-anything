import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

// JwtAccessStrategy validates access tokens, which contain the user unique ID
// in their payload. The validate function returns this user ID, so that the
// token owner is known without querying the database.
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.access_secret,
    });
  }

  async validate(payload: any) {
    return payload.uuid;
  }
}

// JwtRefreshStrategy validates refresh tokens, which contain the user ID and a
// per-session unique random string in the payload. The strategy returns the whole
// payload of the validated refresh token.
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refresh_secret,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
