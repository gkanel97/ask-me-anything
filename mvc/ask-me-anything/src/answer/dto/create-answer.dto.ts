export class CreateAnswerDto {
  id: number;
  answerText: string;
  question: { id: number };
  user: { id: number };
}
