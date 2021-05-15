import {
  Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn
} from "typeorm";

import { Question } from '../../question/entities/question.entity';

@Entity()
export class Keyword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keywordText: string;

  @ManyToMany(() => Question, question => question.id)
  @JoinColumn({ name: 'questionID' })
  questions: Question[];
}
