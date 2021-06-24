import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [UserModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
