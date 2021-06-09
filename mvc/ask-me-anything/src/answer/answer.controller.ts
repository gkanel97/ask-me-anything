import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, UseGuards } from "@nestjs/common";
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from "../auth/jwt.guard";

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post('create')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  create(@Body() createAnswerDto: CreateAnswerDto, @Request() req) {
    return this.answerService.create(createAnswerDto, req.user);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
