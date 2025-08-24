import { BaseEntity } from './base-entity.model';
import { McqResultDto } from '@models/response/mcq-result-dto.model';

export class Result extends BaseEntity {
  total: number;
  correct: number;
  wrong: number;
  unattempted: number;
  percentage: number;
  userId: string;
  attemptedMcqs: McqResultDto[];
}
