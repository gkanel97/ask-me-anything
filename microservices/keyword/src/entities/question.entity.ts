import {
  Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, UpdateDateColumn
} from "typeorm";

import { Keyword } from './keyword.entity';
import { Length } from "class-validator";

@Entity("questions")
export class Question {
  @PrimaryColumn()
  id: number;

  @Column()
  @Length(5, 100)
  questionTitle: string;

  @Column()
  @Length(1, 5000)
  questionText: string;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToMany(() => Keyword, keyword => keyword.questions)
  keywords: Keyword[];
}
