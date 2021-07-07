import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Keyword } from "./entities/keyword.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('getKeywordEvent')
  async getKeywordEvent(@Body('type') type: string, @Body('item') keyword: Keyword) {
    return this.appService.getKeywordEvent(keyword);
  }

  @Get('search/:n')
  search(@Param('n', ParseIntPipe) n: number, @Query('text') text: string) {
    return this.appService.search(n, text);
  }
}
