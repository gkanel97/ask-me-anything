import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from "typeorm";

import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answerText: string;

  @CreateDateColumn()
  answerDate: string;

  @ManyToOne(() => Question, question => question.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'questionID' })
  question: Question;

  @ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
  @JoinColumn ({ name: 'userID'} )
  user: User;
}
