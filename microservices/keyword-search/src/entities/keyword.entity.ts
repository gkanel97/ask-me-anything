import {
  Entity, PrimaryColumn
} from "typeorm";

import { Length } from "class-validator";

@Entity("keywords")
export class Keyword {
  @PrimaryColumn()
  @Length(5, 50)
  keywordText: string;
}
