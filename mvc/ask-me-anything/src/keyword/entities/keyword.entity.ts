import {
  Entity, PrimaryColumn, ManyToMany, JoinTable
} from "typeorm";

import { Question } from '../../question/entities/question.entity';

@Entity()
export class Keyword {
  @PrimaryColumn()
  keywordText: string;

  @ManyToMany(() => Question, question => question.keywords)
  @JoinTable({ name: "question_tags" })
  questions: Question[];
}
