import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpCode,
  UseGuards,
  ParseIntPipe, UseInterceptors, ClassSerializerInterceptor
} from "@nestjs/common";
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from "../auth/jwt.guard";

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
    return this.questionService.delete(questionId, req.user);
  }

  @Post('update/:questionId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  updateMyQuestion(@Param('questionId', ParseIntPipe) questionId: number, @Body() updateQuestionDto: UpdateQuestionDto, @Request() req) {
    return this.questionService.update(questionId, updateQuestionDto, req.user);
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
}