export class CreateKeywordDto {
  id: number;
  keywordText: string;
  questions: { id: number }[];
}
