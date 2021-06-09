import { ObjectWithId } from '../../validation';
import { User } from "../../user/entities/user.entity";

export class CreateAnswerDto {
  answerText: string;
  question: ObjectWithId;
  user: User;
}
