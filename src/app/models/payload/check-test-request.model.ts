import { McqAnswerRequest } from './mcq-answer-request.model';

export class CheckTestRequest {
  TestRequestId: string;
  Mcqs: McqAnswerRequest[];
}
