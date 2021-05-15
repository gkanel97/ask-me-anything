import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';

@Module({
  controllers: [KeywordController],
  providers: [KeywordService]
})
export class KeywordModule {}
