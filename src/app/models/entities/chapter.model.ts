import { Reference } from '@models/shared/reference.model';
import { Attachment } from '@models/shared/attachment.model';
import { BaseEntity } from './base-entity.model';

export class Chapter extends BaseEntity {
  Board: string;
  Grade: string;
  Subject: string;
  Name: string;
  Index: number;
  Author: Reference;
  Media: Attachment;
}
