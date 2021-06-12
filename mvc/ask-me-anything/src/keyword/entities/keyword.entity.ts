import {
  Entity, PrimaryColumn, ManyToMany
} from "typeorm";

import { Question } from '../../question/entities/question.entity';

@Entity()
export class Keyword {
  @PrimaryColumn()
  keywordText: string;

  @ManyToMany(() => Question, question => question.keywords)
  questions: Question[];
}
