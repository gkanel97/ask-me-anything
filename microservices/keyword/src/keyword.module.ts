import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy } from "./jwt.strategy";

@Module({
  imports: [PassportModule, JwtModule.register({})],
  controllers: [KeywordController],
  providers: [KeywordService, JwtAccessStrategy]
})
export class KeywordModule {}
