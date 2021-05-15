import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { KeywordModule } from './keyword/keyword.module';

@Module({
  imports: [UserModule, RefreshTokenModule, QuestionModule, AnswerModule, KeywordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
