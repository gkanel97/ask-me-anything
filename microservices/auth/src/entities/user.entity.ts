import {
    Entity, Column, PrimaryGeneratedColumn, Index, BeforeInsert
} from "typeorm";

import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from "class-validator";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
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

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
