import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { KeywordModule } from './keyword/keyword.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    RefreshTokenModule,
    QuestionModule,
    AnswerModule,
    KeywordModule,
    AuthModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
