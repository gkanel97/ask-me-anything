import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [UserModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
