import { IsNotEmpty, IsString } from "class-validator";

export class CreateKeywordDto {

  @IsNotEmpty()
  @IsString()
  keywordText: string;
}
