import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, EMPTY, filter, Observable, take, tap } from 'rxjs';

import { Result } from '@models/entities/result.model';
import { McqTest } from '@models/response/mcq-test.model';
import { DialogData } from '@models/shared/dialog-data.model';
import { McqAnswerRequest } from '@models/payload/mcq-answer-request.model';
import { CheckTestRequest } from '@models/payload/check-test-request.model';
import { TestRequestResponse } from '@models/response/test-request.response.model';

import { ToasterMessageConstants } from '@constants/toaster-message.constant';

import { HotToastService } from '@ngxpert/hot-toast';
import { DialogService } from '@shared/services/dialog.service';
import { QuizService } from '@features/quiz/services/quiz.service';
import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-quiz-diplay',
  standalone: false,
  templateUrl: './quiz-diplay.component.html',
  styleUrl: './quiz-diplay.component.css',
})
export class QuizDiplayComponent {
  testRequestId = String.Empty;
  quizQuestions$: Observable<McqTest[]>;
  answeredMcqs: McqAnswerRequest[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private quizService: QuizService,
    private dialogService: DialogService,
    private apiHttpService: ApiHttpService
  ) {
    this.quizQuestions$ = this.quizService.quizQuestions$;
    this.testRequestId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchQuizData();
  }

  fetchQuizData() {
    this.apiHttpService
      .getTestRequestById(this.testRequestId)
      .pipe(
        take(1),
        filter((res: TestRequestResponse) => !!res),
        tap((res: TestRequestResponse) => {
          this.quizService.setQuizQuestions(res?.mcqs);
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  handleAnswerSelection(optionSelected: McqAnswerRequest) {
    const existingIndex = this.answeredMcqs.findIndex(answeredMcq => answeredMcq?.mcqId === optionSelected?.mcqId);

    console.log('EXisting Index', existingIndex);

    if (existingIndex === -1) {
      this.answeredMcqs.push(optionSelected);
    } else {
      this.answeredMcqs[existingIndex] = optionSelected;
    }

    console.log('Option Selected', optionSelected);
    console.log('MCQS:', this.answeredMcqs);
  }

  onSubmitButtonClick() {
    this.quizQuestions$.subscribe((questions: McqTest[]) => {
      const dialogData: DialogData = {
        title: 'Submit Test',
        message: `You have ${ questions?.length - this.answeredMcqs?.length} 
          pending mcqs left. Are you sure you want to submit the test?`,
        confirmText: 'Submit',
        cancelText: 'Cancel',
        confirmButtonClass: 'bg-secondary',
      };
      if (this.answeredMcqs?.length < questions?.length) {
        this.dialogService.confirm(dialogData).subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.checkTest();
          }
        });
      } else {
        this.checkTest();
      }
    });
  }

  checkTest() {
    const checkTestRequest: CheckTestRequest = {
      testRequestId: this.testRequestId,
      mcqs: this.answeredMcqs,
    };
    this.apiHttpService
      .checkTest(checkTestRequest)
      .pipe(
        take(1),
        filter((res: Result) => !!res),
        tap((res: Result) => {
          console.log('CHeck', res);
          this.toast.success(ToasterMessageConstants.SUBMIT_TEST);
          this.router.navigate([`quiz/result/${res?.id}`]);
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_SUBMITTING_TEST);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
