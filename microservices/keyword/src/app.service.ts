import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from "./entities/user.entity";
import { InjectEntityManager } from "@nestjs/typeorm";
import { EntityManager } from "typeorm";
import { Question } from "./entities/question.entity";

@Injectable()
export class AppService {

  constructor(@InjectEntityManager() private manager: EntityManager) {}

  // getUserEvent handles a message indicating that a new user has been created.
  async getUserEvent(user: User) {
    const newUser = await this.manager.save(User, user);

    if (newUser) {
      return {status: "OK"}
    }
    else {
      throw new BadRequestException("User insertion failed");
    }
  }

  // getQuestionEvent adds new question entities to the local database. It gets invoked by messages from the subscription channel.
  async getQuestionEvent(question: Question) {
    const newQuestion = await this.manager.save(Question, question);

    if (newQuestion) {
      return {status: "OK"}
    }
    else {
      throw new BadRequestException("Question insertion failed");
    }
  }
}
