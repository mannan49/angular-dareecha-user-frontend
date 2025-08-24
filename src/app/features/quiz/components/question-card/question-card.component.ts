import { Component, EventEmitter, Input, Output } from '@angular/core';

import { McqTest } from '@models/response/mcq-test.model';
import { McqOption } from '@models/shared/mcq-option.model';
import { McqAnswerRequest } from '@models/payload/mcq-answer-request.model';

@Component({
  selector: 'app-question-card',
  standalone: false,
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css',
})
export class QuestionCardComponent {
  @Input() index: number;
  @Input() question: McqTest;
  @Output() answerSelected = new EventEmitter<McqAnswerRequest>();

  selectedOptionId = String.Empty;

  onAnswerSelect(option: McqOption) {
    this.selectedOptionId = option?.optionId;
    this.answerSelected.emit({
      mcqId: this.question?.id,
      chosenOptionId: option?.optionId,
      chosenOptionText: option?.text,
    });
  }
}
