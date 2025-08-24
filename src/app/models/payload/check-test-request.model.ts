import { McqAnswerRequest } from './mcq-answer-request.model';

export class CheckTestRequest {
  submissionTime: Date;
  mcqs: McqAnswerRequest[];
}
