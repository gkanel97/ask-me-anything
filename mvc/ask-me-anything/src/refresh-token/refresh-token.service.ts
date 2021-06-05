import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { InjectEntityManager } from "@nestjs/typeorm";
import { RefreshToken } from "./entities/refresh-token.entity";

@Injectable()
export class RefreshTokenService {
  constructor(@InjectEntityManager() private manager) {}

  async createTokenForUUID(uuid: number): Promise<RefreshToken> {
    const token = 'THIS_IS_A_REFRESH_TOKEN';
    const refTokenEntity = await this.manager.create(RefreshToken, {userID: uuid, token: token});
    return this.manager.save(refTokenEntity);
  }
}
