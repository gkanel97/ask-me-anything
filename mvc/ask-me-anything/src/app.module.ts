import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { KeywordModule } from './keyword/keyword.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule, 
    RefreshTokenModule, 
    QuestionModule, 
    AnswerModule, 
    KeywordModule, 
    AuthModule, 
    TypeOrmModule.forRoot({
      "type": "postgres",
      "url": process.env.DATABASE_URL,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "migrationsTableName": "migrations",
      "migrations": ["dist/migration/*{.ts,.js}"],
      "cli": {
        "migrationsDir": "migration"
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
