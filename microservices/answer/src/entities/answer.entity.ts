import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from "typeorm";

import { Exclude } from "class-transformer";
import { Length } from "class-validator";
import { Question } from "./question.entity";
import { User } from "./user.entity"

@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 10000)
  answerText: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Question, question => question.answers, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'questionID' })
  question: Question;

  @ManyToOne(() => User, user => user.answers, { onDelete: "CASCADE" })
  @JoinColumn ({ name: 'userID'} )
  @Exclude()
  user: User;
}
