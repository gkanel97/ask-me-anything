import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectEntityManager} from "@nestjs/typeorm";
import {EntityManager, ILike} from "typeorm";
import {Keyword} from "./entities/keyword.entity";

@Injectable()
export class AppService {
  constructor(@InjectEntityManager() private manager: EntityManager) {}

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

  async getKeywordEvent(keyword: Keyword) {
    const newKeyword = await this.manager.save(Keyword, keyword);

    if (newKeyword) {
      return {status: "OK"}
    }
    else {
      throw new BadRequestException("Keyword insertion failed");
    }
  }
}
