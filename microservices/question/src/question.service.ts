import {BadRequestException, ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { User } from "./entities/user.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, ILike } from "typeorm";
import { Question } from "./entities/question.entity";

const axios = require('axios').default;

@Injectable()
export class QuestionService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  // publishNewQuestion function publishes new question entities on the equivalent channel,
  // so that other microservices can update their databases
  async publishNewQuestion(newQuestion: Question): Promise<boolean> {
    const resp = await axios.post("http://localhost:4000/publishAsync", {
      channel: "questions",
      message: { type: "new-question", item: newQuestion }
    });
    return resp.status === 204;
  }

  // create function generates new Questions based on the data provided with the POST query.
  // It then saves the entity on the local database and publishes the new question on the equivalent channel
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

  // getOne function fetches one question entity with a specific ID, along with its answers and keywords
  async getOne(questionId: number) {
    return this.manager.findOne(Question, questionId, { relations: ["answers", "keywords"] });
  }

  // getMany function returns the n most recent questions
  async getMany(n: number) {
    return this.manager.find(Question, { take: n, order: { updateDate: "DESC" } });
  }

  // getMy function returns at most n questions created by a user with a specific uuid.
  // The questions are sorted in chronologically descending order
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

  // searchByTitle finds at most n question whose title contain "text" at any position.
  // If no "text" is given, this function returns null
  async searchByTitle(n: number, text: string) {
    if (text) {
      return this.manager.find(Question, {
        where: {
          questionTitle: ILike(`%${text}%`)
        },
        take: n
      });
    }
    else {
      return null;
    }
  }

  // searchByDate finds at most n question created on "date".
  // If no "date" is given, this function returns null
  async searchByDate(n: number, date: string) {
    if (date) {
      return this.manager
          .createQueryBuilder(Question, "q")
          .where('"updateDate"::date = :requestedDate', { requestedDate: date })
          .orderBy('"updateDate"', "DESC")
          .getMany();
    }
    else {
      return null;
    }
  }

  // getQuestionsPerDay counts the number of questions created in the last n days by all users
  // It returns an object with the days as keys and the counts as values.
  async getQuestionsPerDay(n: number) {
    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - n);

    // The generated SQL query is equivalent to:
    // SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM questions WHERE updateDate > firstDay GROUP BY date ORDER BY date DESC LIMIT n;
    return this.manager
        .createQueryBuilder(Question, "q")
        .select('TO_CHAR("updateDate", \'YYYY-MM-DD\')', "date")
        .addSelect("COUNT(id)", "count")
        .where('"updateDate" > DATE(:dayInterval)', {dayInterval: firstDay.toISOString()})
        .groupBy("date")
        .orderBy("date", "DESC")
        .getRawMany();
  }

  // getQuestionsPerDay counts the number of questions created in the last n days by one user with a specific uuid.
  // It returns an object with the days as keys and the counts as values.
  async getMyQuestionsPerDay(n: number, uuid: string) {
    // return this.manager.query("SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM questions WHERE userID = $1 GROUP BY date ORDER BY date DESC LIMIT $2;", [uuid ,n]);

    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - n);

    // The generated SQL query is equivalent to:
    // SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM questions WHERE userID = uuid AND date > firstDay GROUP BY date ORDER BY date DESC LIMIT n;
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
