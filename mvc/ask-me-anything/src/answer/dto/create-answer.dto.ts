import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAnswerDto {

  @IsNotEmpty()
  @IsString()
  answerText: string;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;
}
