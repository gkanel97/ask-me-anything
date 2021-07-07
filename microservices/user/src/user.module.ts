import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppService } from "./app.service";

@Module({
  controllers: [UserController],
  providers: [UserService, AppService]
})
export class UserModule {}
