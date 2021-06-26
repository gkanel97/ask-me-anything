import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
  ManyToOne, JoinColumn, UpdateDateColumn
} from "typeorm";

import { User } from './user.entity';
import { Exclude } from "class-transformer";
import { Length } from "class-validator";

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
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
}
