import {
  Entity, Column, PrimaryColumn, CreateDateColumn,
  ManyToOne, JoinColumn, UpdateDateColumn, OneToMany
} from "typeorm";

import { User } from './user.entity';
import { Exclude } from "class-transformer";
import { Length } from "class-validator";
import { Answer } from "./answer.entity";

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

  @ManyToOne(() => User, user => user.questions, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'userID' })
  @Exclude()
  user: User;

  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];
}
