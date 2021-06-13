import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from "typeorm";

import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';
import { Exclude } from "class-transformer";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";

@Entity()
@UseInterceptors(ClassSerializerInterceptor)
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
