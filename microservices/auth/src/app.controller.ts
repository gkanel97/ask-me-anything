import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from "./entities/user.entity";

@Controller('sync')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('getUserEvent')
  async getUserEvent(@Body('type') type: string, @Body('item') user: User) {
    return this.appService.getUserEvent(user);
  }
}
