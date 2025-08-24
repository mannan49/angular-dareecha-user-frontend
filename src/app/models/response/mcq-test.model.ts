import { Reference } from '@models/shared/reference.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { Attachment } from '@models/shared/attachment.model';

export class McqTest {
  id: string;
  statement: string;
  options: McqOption[];
  subject: string;
  grade: string;
  chapter: Reference;
  attachments: Attachment[];
}
