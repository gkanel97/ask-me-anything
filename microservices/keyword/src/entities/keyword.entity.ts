import {
  Entity, PrimaryColumn, ManyToMany, JoinTable, BeforeInsert
} from "typeorm";

import { Question } from './question.entity';
import { Length } from "class-validator";

@Entity("keywords")
export class Keyword {
  @PrimaryColumn()
  @Length(5, 50)
  keywordText: string;

  @ManyToMany(() => Question, question => question.keywords)
  @JoinTable({
    name: "question_tags",
    joinColumn: {
      name: "keywordText",
      referencedColumnName: "keywordText"
    },
    inverseJoinColumn: {
      name: "questionId",
      referencedColumnName: "id"
    }
  })
  questions: Question[];

  @BeforeInsert()
  async keywordLowercase() {
    this.keywordText = this.keywordText.toLowerCase();
  }
}
