import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {User} from "./entities/user.entity";
import { Question } from "./entities/question.entity";

@Controller('sync')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('getUserEvent')
  async getUserEvent(@Body('type') type: string, @Body('item') user: User) {
    return this.appService.getUserEvent(user);
  }

  @Post('getQuestionEvent')
  async getQuestionEvent(@Body('type') type: string, @Body('item') question: Question) {
    return this.appService.getQuestionEvent(question);
  }
}
