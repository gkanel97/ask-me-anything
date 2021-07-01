import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';
import { User } from './entities/user.entity';
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

      const newAnswerObject = {user: user, question: question, answerText: createAnswerDto.answerText};
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

    async getAnswersPerDay(n: number) {
        // return this.manager.query("SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM answers GROUP BY date ORDER BY date DESC LIMIT ($1);", [n]);
        const firstDay = new Date();
        firstDay.setDate(firstDay.getDate() - n);

        return this.manager
            .createQueryBuilder(Answer, "ans")
            .select("DATE(updateDate)", "date")
            .addSelect("COUNT(id)", "count")
            .where("date > DATE(:dayInterval)", {dayInterval: firstDay.toISOString()})
            .groupBy("date")
            .orderBy("date", "DESC")
            .getRawMany();
    }

    async getMyAnswersPerDay(n: number, uuid: string) {
        // return this.manager.query("SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM answers WHERE userID = $1 GROUP BY date ORDER BY date DESC LIMIT $2;", [uuid ,n]);
        const firstDay = new Date();
        firstDay.setDate(firstDay.getDate() - n);

        return this.manager
            .createQueryBuilder(Answer, "ans")
            .select("DATE(updateDate)", "date")
            .addSelect("COUNT(id)", "count")
            .where("userID = :userId", {userId: uuid})
            .andWhere("date > DATE(:dayInterval)", {dayInterval: firstDay.toISOString()})
            .groupBy("date")
            .orderBy("date", "DESC")
            .getRawMany();
    }
}
