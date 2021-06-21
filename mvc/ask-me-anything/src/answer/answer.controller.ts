import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  HttpCode,
  UseGuards,
  ParseIntPipe, UseInterceptors, ClassSerializerInterceptor
} from "@nestjs/common";
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller('answer')
@UseInterceptors(ClassSerializerInterceptor)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  create(@Body() createAnswerDto: CreateAnswerDto, @Request() req) {
    return this.answerService.create(createAnswerDto, req.user);
  }

  @Post('update/:answerId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  update(@Param('answerId', ParseIntPipe) answerId: number, @Body() updateAnswerDto: UpdateAnswerDto, @Request() req) {
    return this.answerService.update(answerId, updateAnswerDto, req.user);
  }

  @Post('delete/:answerId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  remove(@Param('answerId', ParseIntPipe) answerId: number, @Request() req) {
    return this.answerService.delete(answerId, req.user);
  }

  @Get('getMy/:n')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getMy(@Param('n', ParseIntPipe) n: number, @Request() req) {
    return this.answerService.getMy(n, req.user);
  }

  @Get('getAnswersPerDay/:n')
  @HttpCode(200)
  getQuestionsPerDay(@Param('n', ParseIntPipe) n: number) {
    return this.answerService.getAnswersPerDay(n);
  }

  @Get('getMyAnswersPerDay/:n')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getMyQuestionsPerDay(@Param('n', ParseIntPipe) n: number, @Request() req) {
    return this.answerService.getMyAnswersPerDay(n, req.user);
  }
}
