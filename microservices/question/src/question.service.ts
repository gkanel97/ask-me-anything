import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { User } from "./entities/user.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, getManager } from "typeorm";
import { Question } from "./entities/question.entity";

const axios = require('axios').default;

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  async publishNewQuestion(newQuestion: Question): Promise<boolean> {
    const resp = await axios.post("http://localhost:4000/publishAsync", {
      channel: "questions",
      message: { type: "new-question", item: newQuestion }
    });
    return resp.status === 204;
  }

  async create(createQuestionDto: CreateQuestionDto, uuid) {
    return this.manager.transaction(async innerManager => {
      const user = await innerManager.findOne(User, uuid);
      if (!user) {
        throw new NotFoundException(`User ${uuid} not found`);
      }
      const newQuestionObject = { user: user, ...createQuestionDto };
      const newQuestionEntity = await innerManager.create(Question, newQuestionObject);
      let newQuestion = await innerManager.save(newQuestionEntity);
      const publishSuccess = await this.publishNewQuestion(newQuestion);
      if (publishSuccess) {
        return newQuestion;
      }
      else {
        throw new BadRequestException("Publishing failed");
      }
    });
  }

  async delete(questionId: number, uuid: string) {
    return this.manager.transaction(async innerManager => {
      const question = await innerManager.findOne(Question, questionId, { relations: ["user"] });
      if (!question) {
        throw new NotFoundException(`Question ${questionId} has never existed or was deleted`);
      }
      if (question.user.id !== uuid) {
        throw new ForbiddenException("You have no permission to delete this question");
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
        throw new ForbiddenException("You have no permission to update this question");
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