import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User, user => user.tokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'userID' })
  user: User;
}
