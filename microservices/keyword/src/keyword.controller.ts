import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  UseGuards,
  ParseIntPipe,
  Query
} from "@nestjs/common";
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { JwtAuthGuard } from "./jwt.guard";

@Controller('keyword')
export class KeywordController {
  constructor(private readonly keywordService: KeywordService) {}

  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  create(@Body() createKeywordDto: CreateKeywordDto) {
    return this.keywordService.create(createKeywordDto);
  }

  @Get('search/:n')
  search(@Param('n', ParseIntPipe) n: number, @Query('text') text: string) {
    return this.keywordService.search(n, text);
  }

  @Post('tag')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  tagQuestion(@Body('questionId', ParseIntPipe) questionId: number, @Body('keywordText') keywordText: string) {
    return this.keywordService.tagQuestion(questionId, keywordText);
  }

  @Get('questionsPerKeyword')
  @HttpCode(200)
  getQuestionsPerKeyword() {
    return this.keywordService.getQuestionsPerKeyword();
  }
}
