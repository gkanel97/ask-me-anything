import { PickType } from "@nestjs/mapped-types";
import { CreateAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends PickType(CreateAnswerDto, ['answerText']) {}
