import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
  OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, UpdateDateColumn
} from "typeorm";

import { User } from '../../user/entities/user.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';
import { Exclude, Transform } from "class-transformer";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionTitle: string;

  @Column()
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

  @ManyToMany(() => Keyword, keyword => keyword.questions)
  // @JoinTable()
  keywords: Keyword[];
}
