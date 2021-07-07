import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from "./user.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
