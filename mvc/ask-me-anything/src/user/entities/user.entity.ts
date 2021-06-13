import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, BeforeInsert, BeforeUpdate
} from "typeorm";

import { Answer } from '../../answer/entities/answer.entity';
import { Question } from '../../question/entities/question.entity';
import { RefreshToken } from '../../refresh-token/entities/refresh-token.entity';

import * as bcrypt from 'bcrypt';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToMany(() => RefreshToken, token => token.user)
  tokens: RefreshToken[];

  @OneToMany(() => Question, question => question.user)
  questions: Question[];

  @OneToMany(() => Answer, answer => answer.user)
  answers: Answer[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
