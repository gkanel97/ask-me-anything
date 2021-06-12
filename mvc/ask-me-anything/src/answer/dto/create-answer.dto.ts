import { ObjectWithId } from '../../validation';

export class CreateAnswerDto {
  answerText: string;
  question: ObjectWithId;
}
