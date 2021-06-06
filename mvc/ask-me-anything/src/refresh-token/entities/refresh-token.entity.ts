import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from '../../user/entities/user.entity';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User, user => user.tokens, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'userUUID' })
  @Index()
  user: User;
}
