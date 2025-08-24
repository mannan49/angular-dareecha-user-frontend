import { BaseFilter } from './base-filter.model';

export class EntityFilter extends BaseFilter {
  board?: string;
  boards?: string[];
  subject?: string;
  query?: string;
  types?: string[];
  grade?: string;
  chapterIds?: string[];
  difficultyLevel?: string;
}
