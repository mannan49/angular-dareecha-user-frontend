import { BaseEntity } from './base-entity.model';
import { McqResultDto } from '@models/response/mcq-result-dto.model';

export class Result extends BaseEntity {
  Total: number;
  Correct: number;
  Wrong: number;
  Unattempted: number;
  Percentage: number;
  UserId: string;
  AttemptedMcqs: McqResultDto[];
}
