import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { take, filter, tap, catchError, EMPTY } from 'rxjs';

import { Select } from '@models/shared/select.model';
import { Chapter } from '@models/entities/chapter.model';
import { EntityFilter } from '@models/payload/entity-filter.model';
import { PagedResponse } from '@models/response/paged-response.model';
import { TestRequestResponse } from '@models/response/test-request.response.model';

import { SortOrder } from '@enums/sort-order.enum';
import { BoardsList } from '@constants/boards-list.constants';
import { GradesList } from '@constants/grades-list.constants';
import { SubjectsList } from '@constants/subjects-list.constants';
import { ToasterMessageConstants } from '@constants/toaster-message.constant';

import { HotToastService } from '@ngxpert/hot-toast';
import { ApiHttpService } from '@shared/services/api-http.service';
import { QuizService } from '@features/quiz/services/quiz.service';

@Component({
  selector: 'app-quiz-form',
  standalone: false,
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css',
})
export class QuizFormComponent {
  quizForm: FormGroup;
  chaptersList: Select[] = [];
  boardsList: Select[] = BoardsList;
  gradesList: Select[] = GradesList;
  subjectsList: Select[] = SubjectsList;

  constructor(
    private router: Router,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private apiHttpService: ApiHttpService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.fetchChapters();
  }

  initializeForm() {
    this.quizForm = this.formBuilder.group({
      grade: [String.Empty, Validators.required],
      board: [String.Empty, Validators.required],
      subject: [String.Empty, Validators.required],
      chapter: [String.Empty, Validators.required],
      numberOfMcqs: [null, Validators.required],
    });
  }

  fetchChapters() {
    const chapterFilter = this.constructChapterFilter();
    this.getChaptersByFilter(chapterFilter);
  }

  constructChapterFilter(): EntityFilter {
    const formValue = this.quizForm.value;
    const filter = new EntityFilter();
    filter.Grade = formValue?.grade;
    if (formValue?.board) {
      filter.Boards = [formValue?.board];
    }
    filter.Subject = formValue?.subject;
    filter.Limit = 200;
    return filter;
  }

  getChaptersByFilter(payload: EntityFilter) {
    this.apiHttpService
      .getChaptersByFilter(payload)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: PagedResponse<Chapter>) => {
          this.chaptersList = res?.Items?.map(chapter => {
            return {
              Display: chapter?.Name,
              Value: chapter?.Id,
            };
          });
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }

  handleSelection(value: string) {
    if (value) {
      setTimeout(() => {
        this.fetchChapters();
      });
    }
  }

  onSubmitForm() {
    if (this.quizForm.invalid) return;
    const testFilter = this.constructTestFilter();
    this.generateTest(testFilter);
  }

  constructTestFilter(): EntityFilter {
    const formValue = this.quizForm.value;
    const filter = new EntityFilter();
    filter.Grade = formValue?.grade;
    if (formValue?.board) {
      filter.Boards = [formValue?.board];
    }
    filter.Subject = formValue?.subject;
    filter.ChapterIds = [formValue?.chapter];
    filter.Limit = formValue?.numberOfMcqs;
    filter.SortOrder = SortOrder.RANDOM;
    return filter;
  }

  generateTest(testFilter: EntityFilter) {
    this.apiHttpService
      .generateTest(testFilter)
      .pipe(
        take(1),
        filter(res => !!res),
        tap((res: TestRequestResponse) => {
          console.log('REs', res);
          this.quizService.setQuizQuestions(res?.Mcqs);
          this.toast.success(ToasterMessageConstants.START_TEST);
          this.router.navigate([`quiz/attempt/${res?.TestRequestId}`]);
        }),
        catchError(() => {
          this.toast.error(ToasterMessageConstants.ERROR_STARTING_TEST);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
