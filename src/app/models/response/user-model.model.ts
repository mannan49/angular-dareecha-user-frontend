import { Attachment } from '@models/shared/attachment.model';

export class UserModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  picture: Attachment;
}
