import { McqAnswerRequest } from './mcq-answer-request.model';

export class CheckTestRequest {
  testRequestId: string;
  mcqs: McqAnswerRequest[];
}
