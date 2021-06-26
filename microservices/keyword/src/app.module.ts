import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeywordModule } from "./keyword.module";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [KeywordModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
