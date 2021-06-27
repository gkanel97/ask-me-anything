import {
  Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, UpdateDateColumn, ManyToOne, JoinColumn
} from "typeorm";

import { Keyword } from './keyword.entity';
import { Length } from "class-validator";
import { User } from "./user.entity";
import { Exclude } from 'class-transformer';

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

  @ManyToMany(() => Keyword, keyword => keyword.questions)
  keywords: Keyword[];
}
