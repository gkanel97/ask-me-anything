import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany
} from "typeorm";

import { Answer } from '../../answer/entities/answer.entity';
import { Question } from '../../question/entities/question.entity';
import { RefreshToken } from '../../refresh-token/entities/refresh-token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  passwordSalt: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToMany(() => RefreshToken, token => token.user)
  tokens: RefreshToken[];

  @OneToMany(() => Question, question => question.id)
  questions: Question[];

  @OneToMany(() => Answer, answer => answer.id)
  answers: Answer[];
}