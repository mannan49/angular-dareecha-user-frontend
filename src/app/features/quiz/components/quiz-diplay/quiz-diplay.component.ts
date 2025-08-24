import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { catchError, EMPTY, filter, Observable, take, tap } from 'rxjs';

import { McqTest } from '@models/response/mcq-test.model';
import { McqAnswerRequest } from '@models/payload/mcq-answer-request.model';
import { CheckTestRequest } from '@models/payload/check-test-request.model';

import { QuizService } from '@features/quiz/services/quiz.service';
import { ApiHttpService } from '@shared/services/api-http.service';
import { TestRequestResponse } from '@models/response/test-request.response.model';
import { Result } from '@models/entities/result.model';

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
    private quizService: QuizService,
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
      console.log('Questions', questions);
      if (this.answeredMcqs?.length < questions?.length) {
        console.log('Are you sure?');
        return;
      } else {
        this.checkTest();
      }
    });
  }

  checkTest() {
    const checkTestRequest: CheckTestRequest = {
      submissionTime: new Date(),
      mcqs: this.answeredMcqs,
    };
    this.apiHttpService
      .checkTest(checkTestRequest)
      .pipe(
        take(1),
        filter((res: Result) => !!res),
        tap((res: Result) => {
          console.log('CHeck', res);
          this.router.navigate([`quiz/result/${res?.id}`]);
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }
}
