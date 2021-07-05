import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { User } from "../user/entities/user.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager, getManager, ILike } from "typeorm";
import { Question } from "./entities/question.entity";

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
        throw new ForbiddenException("You can't delete another user's question");
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
        throw new ForbiddenException("You can't update another user's question");
      }
      innerManager.merge(Question, question, updateQuestionDto);
      return innerManager.save(question);
    });
  }

  async getOne(questionId: number) {
    return this.manager.findOne(Question, questionId, { relations: ["answers", "keywords"] });
  }

  async getMany(n: number) {
    return this.manager.find(Question, { take: n, order: { updateDate: "DESC" }, relations: ["keywords"] });
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

  async getQuestionsPerDay(n: number) {
    // return this.manager.query("SELECT DATE(updateDate) AS date, COUNT(id) AS count FROM questions GROUP BY date ORDER BY date DESC LIMIT ($1);", [n]);
    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - n);

    return this.manager
      .createQueryBuilder(Question, "q")
      .select('TO_CHAR("updateDate", \'YYYY-MM-DD\')', "date")
      .addSelect("COUNT(id)", "count")
      .where('"updateDate" > DATE(:dayInterval)', {dayInterval: firstDay.toISOString()})
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
      .select('TO_CHAR("updateDate", \'YYYY-MM-DD\')', "date")
      .addSelect("COUNT(id)", "count")
      .where('"userID" = :userId', {userId: uuid})
      .andWhere('"updateDate" > DATE(:dayInterval)', {dayInterval: firstDay.toISOString()})
      .groupBy("date")
      .orderBy("date", "ASC")
      .getRawMany();
  }
}
