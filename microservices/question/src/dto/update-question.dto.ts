import { PickType } from "@nestjs/mapped-types";
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PickType(CreateQuestionDto, ['questionTitle', 'questionText']) {}

