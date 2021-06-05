import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [RefreshTokenService]
})
export class RefreshTokenModule {}
