import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createAnswerDto: CreateAnswerDto, uuid: number): Promise<Answer> {

    return this.manager.transaction(async manager => {
      const questionId = createAnswerDto.question.id;
      if (!questionId) {
        throw new BadRequestException('Question ID is missing');
      }
      const question = await this.manager.findOne(Question, createAnswerDto.question.id);
      if (!question) {
        throw new NotFoundException(`Question ${questionId} not found`);
      }
      const user = await this.manager.findOne(User, uuid);
      if (!user) {
        throw new NotFoundException(`User ${uuid} not found`);
      }

      const newAnswerObject = {user: user, ...createAnswerDto};
      const newAnswerEntity = await this.manager.create(Answer, newAnswerObject);
      return this.manager.save(newAnswerEntity);
    });
    
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
