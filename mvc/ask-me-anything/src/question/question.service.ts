import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { User } from "../user/entities/user.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, getManager } from "typeorm";
import { Question } from "./entities/question.entity";
import { first } from "rxjs/operators";

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async create(createQuestionDto: CreateQuestionDto, uuid) {
    return this.manager.transaction(async innerManager => {
      const user = await innerManager.findOne(User, uuid);
      if (!user) {
        throw new NotFoundException(`User ${uuid} not found`);
      }
      const newQuestionObject = { user: user, ...createQuestionDto };
      const newQuestionEntity = await innerManager.create(Question, newQuestionObject);
      return innerManager.save(newQuestionEntity);
    });
  }

  async delete(questionId: number, uuid: string) {
    return this.manager.transaction(async innerManager => {
      const question = await innerManager.findOne(Question, questionId, { relations: ["user"] });
      if (!question) {
        throw new NotFoundException(`Question ${questionId} has never existed or was deleted`);
      }
      if (question.user.id !== uuid) {
        throw new ForbiddenException("You ain't gonna delete other people's questions, you BIATCH");
      }
      await innerManager.delete(Question, questionId);
    });
  }

  async update(questionId: number, updateQuestionDto: UpdateQuestionDto, uuid: string) {
    return this.manager.transaction(async innerManager => {
      const question = await innerManager.findOne(Question, questionId, {relations: ["user"]});
      if (!question) {
        throw new NotFoundException(`Question ${questionId} has never existed or was deleted`);
      }
      if (question.user.id !== uuid) {
        throw new ForbiddenException("You ain't gonna delete other people's questions, you BIATCH");
      }
      innerManager.merge(Question, question, updateQuestionDto);
      return innerManager.save(question);
    });
  }

  async getOne(questionId: number) {
    return this.manager.findOne(Question, questionId, { relations: ["answers", "keywords"] });
  }

  async getMany(n: number) {
    return this.manager.find(Question, { take: n, order: { updateDate: "DESC" } });
  }

  async getMy(n: number, uuid: string) {
    return this.manager.find(Question, {
      where: {
        user: {
          id: uuid
        }
      },
      take: n,
      order: {
        updateDate: "DESC"
      }
    });
  }

  async getQuestionsPerDay(n: number) {
    // return this.manager.query("SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM questions GROUP BY date ORDER BY date DESC LIMIT ($1);", [n]);
    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - n);

    return this.manager
      .createQueryBuilder(Question, "q")
      .select("DATE(updateDate)", "date")
      .addSelect("COUNT(id)", "count")
      .where("date > DATE(:dayInterval)", {dayInterval: firstDay.toISOString()})
      .groupBy("date")
      .orderBy("date", "DESC")
      .getRawMany();
  }

  async getMyQuestionsPerDay(n: number, uuid: string) {
    // return this.manager.query("SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM questions WHERE userID = $1 GROUP BY date ORDER BY date DESC LIMIT $2;", [uuid ,n]);

    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - n);

    return this.manager
      .createQueryBuilder(Question, "q")
      .select("DATE(updateDate)", "date")
      .addSelect("COUNT(id)", "count")
      .where("userID = :userId", {userId: uuid})
      .andWhere("date > DATE(:dayInterval)", {dayInterval: firstDay.toISOString()})
      .groupBy("date")
      .orderBy("date", "ASC")
      .getRawMany();
  }
}
