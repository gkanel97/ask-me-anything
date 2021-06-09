import { IsNumber } from 'class-validator';

export class ObjectWithId {
  @IsNumber()
  id: number;
}
