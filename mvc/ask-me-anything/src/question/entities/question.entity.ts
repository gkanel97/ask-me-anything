import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,
  OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, UpdateDateColumn
} from "typeorm";

import { User } from '../../user/entities/user.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';

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

  @ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'userID' })
  user: User;

  @OneToMany(() => Answer, answer => answer.id)
  answers: Answer[];

  @ManyToMany(() => Keyword, keyword => keyword.id)
  @JoinTable()
  keywords: Keyword[];
}
