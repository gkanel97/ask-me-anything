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

    // Create function generates a new answer by a specific user for a given question.
    // First it checks if the answer and the user provided actually exist and then
    // creates the new answer.
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

    // This function modifies an answer Entity, using the new data passed by the updateAnswerDto.
    // First it checks if the user owns the answer and is thus authorized to change it.
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

    // This function deletes an answer entity, after checking that the user owns it and has the
    // permission to delete it.
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

    // getMy function returns the last n answers that a specific user processed, along
    // with the question each of them answers.
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

    // getAnswersPerDay aggregates the answers that have been processed by all users during the last n days
    // It creates a SQL query equivalent to:
    // SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM answers WHERE date > firstDay GROUP BY date ORDER BY date DESC LIMIT n;
    async getAnswersPerDay(n: number) {
        const firstDay = new Date();
        firstDay.setDate(firstDay.getDate() - n);
        return this.manager
            .createQueryBuilder(Answer, "ans")
            .select('TO_CHAR("updateDate", \'YYYY-MM-DD\')', "date")
            .addSelect("COUNT(id)", "count")
            .where('"updateDate" > DATE(:dayInterval)', {dayInterval: firstDay.toISOString()})
            .groupBy("date")
            .orderBy("date", "DESC")
            .getRawMany();
    }

    // getMyAnswersPerDay aggregates the answers that have been processed by a specific user during the last n days
    // It creates a SQL query equivalent to:
    // SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM answers WHERE userID = uuid AND date > firstDay GROUP BY date ORDER BY date DESC LIMIT n;
    async getMyAnswersPerDay(n: number, uuid: string) {
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
