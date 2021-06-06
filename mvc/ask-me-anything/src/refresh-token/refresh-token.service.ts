import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from "@nestjs/typeorm";
import { RefreshToken } from "./entities/refresh-token.entity";

@Injectable()
export class RefreshTokenService {
  constructor(@InjectEntityManager() private manager) {}

  async saveToken({ uuid, identifier }): Promise<RefreshToken> {
    const refTokenEntity = await this.manager.create(RefreshToken, { token: identifier, user: uuid });
    return this.manager.save(refTokenEntity);
  }

  async verifyUserToken(uuid, token): Promise<RefreshToken> {
    return this.manager.findOneOrFail(RefreshToken, { token: token, user: uuid });
  }

  async deleteToken(uuid, token): Promise<void> {
    return this.manager.delete(RefreshToken, { user: uuid, token: token });
  }

  async deleteAllTokens(uuid): Promise<void> {
    return this.manager.delete(RefreshToken, { user: uuid });
  }

}
