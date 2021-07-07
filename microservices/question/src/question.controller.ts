import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  HttpCode,
  UseGuards,
  ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, ForbiddenException, Query
} from "@nestjs/common";
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from "./jwt.guard";

@Controller('question')
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto, @Request() req) {
    return this.questionService.create(createQuestionDto, req.user);
  }

  @Post('delete/:questionId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteMyQuestion(@Param('questionId', ParseIntPipe) questionId: number, @Request() req) {
    throw new ForbiddenException();
  }

  @Post('update/:questionId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  updateMyQuestion(@Param('questionId', ParseIntPipe) questionId: number, @Body() updateQuestionDto: UpdateQuestionDto, @Request() req) {
    throw new ForbiddenException();
  }

  @Get('getOne/:id')
  @HttpCode(200)
  getOne(@Param('id', ParseIntPipe) questionId: number) {
    return this.questionService.getOne(questionId);
  }

  @Get('getMany/:n')
  @HttpCode(200)
  getMany(@Param('n', ParseIntPipe) n: number) {
    return this.questionService.getMany(n);
  }

  @Get('getMy/:n')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getMy(@Param('n', ParseIntPipe) n: number, @Request() req) {
    return this.questionService.getMy(n, req.user);
  }

  @Get('searchByTitle/:n')
  @HttpCode(200)
  searchByTitle(@Param('n', ParseIntPipe) n:number, @Query('title') title: string) {
    return this.questionService.searchByTitle(n, title);
  }

  @Get('searchByDate/:n')
  @HttpCode(200)
  searchByDate(@Param('n', ParseIntPipe) n:number, @Query('date') date: string) {
    return this.questionService.searchByDate(n, date);
  }

  @Get('getQuestionsPerDay/:n')
  @HttpCode(200)
  getQuestionsPerDay(@Param('n', ParseIntPipe) n: number) {
    return this.questionService.getQuestionsPerDay(n);
  }

  @Get('getMyQuestionsPerDay/:n')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getMyQuestionsPerDay(@Param('n', ParseIntPipe) n: number, @Request() req) {
    return this.questionService.getMyQuestionsPerDay(n, req.user);
  }
}