import { Annotation } from '../shared/annotation.model';
import { Attachment } from '../shared/attachment.model';
import { BaseEntity } from './base-entity.model';

export class Note extends BaseEntity {
  Title: string;
  Description: string;
  Grade: string;
  Subject: string;
  Chapter: string;
  Topic: string;
  Type: string;
  Board: string;
  File: Attachment;
  CoverImage: Attachment;
  UploadedBy: string;
  Annotations: Annotation[];
}
