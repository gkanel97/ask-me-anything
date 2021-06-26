import {
    Entity, Column, PrimaryColumn, Index, OneToMany
} from "typeorm";

import { IsEmail, IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";
import { Question } from "./question.entity";
import { Answer } from "./answer.entity";

@Entity("users")
export class User {
    @PrimaryColumn({ type: "uuid" })
    id: string;

    @Column({ unique: true })
    @Index()
    @IsNotEmpty()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @OneToMany(() => Question, question => question.user)
    questions: Question[];

    @OneToMany(() => Answer, answer => answer.user)
    answers: Answer[];
}
