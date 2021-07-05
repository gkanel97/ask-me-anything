import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectEntityManager } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { EntityManager, ILike } from "typeorm";
import { Question } from "../question/entities/question.entity";

@Injectable()
export class KeywordService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

  // It is not necessary to check if a keyword is already in the database.`
  // create function will make no changes if it already exists
  // and the frontend does not have to be notified
  async create(createKeywordDto: CreateKeywordDto): Promise<Keyword> {
    const keyword = await this.manager.create(Keyword, createKeywordDto);
    return this.manager.save(keyword);
  }

  // search function returns at most n keywords starting with "text"
  // If no text is given, this function returns at most n keywords
  async search(n: number, text: string) {
    if (text) {
      return this.manager.find(Keyword, {
        where: {
          keywordText: ILike(`${text}%`)
        },
        take: n
      });
    }
    else {
      return this.manager.find(Keyword, {
        take: n
      });
    }
  }

  // tagQuestion adds a keyword to a given question. Both the question and the keyword must already exist.
  // The ORM is not used in this function to avoid performance degradation.
  async tagQuestion(questionId: number, keywordText: string) {
    return this.manager.transaction(async innerManager => {
      const keyword = await innerManager.findOne(Keyword, keywordText);
      if (!keyword) {
        throw new NotFoundException(`Keyword ${keywordText} does not exist`);
      }
      const question = await innerManager.findOne(Question, questionId);
      if (!question) {
        throw new NotFoundException(`Question with id ${questionId} does not exist`);
      }

      // The following raw SQL query is equivalent to:
      // keyword.questions.push(question);
      // return innerManager.save(keyword);
      await this.manager.query('INSERT INTO question_tags ("keywordText", "questionId") VALUES ($1, $2)', [keywordText, questionId]);
    });
  }

  // filterQuestionsByKeyword finds at most n questions tagged with a keyword that contains "text"
  async filterQuestionsByKeyword(n, text) {
    return this.manager
      .query('SELECT q.* FROM questions q INNER JOIN question_tags qt ON q.id = qt."questionId" WHERE qt."keywordText" LIKE $1 LIMIT $2', [`%${text}%`, n]);
  }

  // getQuestionsPerKeyword counts the number of questions that have been tagged with each keyword.
  // The resulting query is equivalent to:
  // SELECT keywordText, COUNT(questionId) FROM (question_tags) GROUP BY (keywordText) ORDER BY count DESC LIMIT n;
  async getQuestionsPerKeyword(n) {
    return this.manager
      .createQueryBuilder()
      .select('"keywordText"', "keyword")
      .addSelect('COUNT("questionId")', "count")
      .from("question_tags", "qt")
      .groupBy('"keywordText"')
      .orderBy("count", "DESC")
      .limit(n)
      .getRawMany();
  }
}