import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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
    return this.manager.transaction(async innerManager => {
      const question = await innerManager.findOne(Question, createAnswerDto.questionId);
      if (!question) {
        throw new NotFoundException(`Question ${createAnswerDto.questionId} not found`);
      }
      const user = await innerManager.findOne(User, uuid);
      if (!user) {
        throw new NotFoundException(`User ${uuid} not found`);
      }

      const newAnswerObject = {user: user, question: question, ...createAnswerDto};
      const newAnswerEntity = await innerManager.create(Answer, newAnswerObject);
      return innerManager.save(newAnswerEntity);
    });
    
  }

 async update(answerId: number, updateAnswerDto: UpdateAnswerDto, uuid: string) {
    return this.manager.transaction(async innerManager => {
      const answer = await innerManager.findOne(Answer, answerId, { relations: ["user"] });
      if (!answer) {
        throw new NotFoundException(`Answer ${answerId} was not found`);
      }
      if (answer.user.id !== uuid) {
        throw new ForbiddenException("You cannot modify another user's answer");
      }
      innerManager.merge(Answer, answer, updateAnswerDto);
      return innerManager.save(answer);
    });
 }

 async delete(answerId: number, uuid: string) {
    return this.manager.transaction(async innerManager => {
      const answer = await innerManager.findOne(Answer, answerId, { relations: ["user"] });
      if (!answer) {
        throw new NotFoundException(`Answer ${answerId} was not found`);
      }
      if (answer.user.id !== uuid) {
        throw new ForbiddenException("You cannot delete another user's answer");
      }
      await innerManager.delete(Answer, answerId);
    });
 }

 async getMy(n: number, uuid: string) {
    return this.manager.find(Answer, {
      where: {
        user: { id: uuid }
      },
      take: n,
      order: {
        updateDate: "DESC"
      },
      relations: ["question"]
    });
 }
}
