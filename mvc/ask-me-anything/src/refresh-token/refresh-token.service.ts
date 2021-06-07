import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from "@nestjs/typeorm";
import { RefreshToken } from "./entities/refresh-token.entity";

// Refresh tokens are stored in a database, because a user may be connected from
// different devices a simultaneously.

@Injectable()
export class RefreshTokenService {
  constructor(@InjectEntityManager() private manager) {}

  // Stores a token containing the user ID and a unique session identifier in database
  async saveToken({ uuid, identifier }): Promise<RefreshToken> {
    const refTokenEntity = await this.manager.create(RefreshToken, { token: identifier, user: uuid });
    return this.manager.save(refTokenEntity);
  }

  // Checks if the refresh token given by the client is stored in the database.
  async verifyUserToken(uuid, token): Promise<RefreshToken> {
    return this.manager.findOneOrFail(RefreshToken, { token: token, user: uuid });
  }

  // Deletes a refresh token, thus terminating a login session and login out
  // the user from one device.
  async deleteToken(uuid, token): Promise<void> {
    return this.manager.delete(RefreshToken, { user: uuid, token: token });
  }

  // Cancels all tokens belonging to a users and therefore disconnects them from
  // all devices.
  async deleteAllTokens(uuid): Promise<void> {
    return this.manager.delete(RefreshToken, { user: uuid });
  }

}
