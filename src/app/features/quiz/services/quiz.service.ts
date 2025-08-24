import { Injectable } from '@angular/core';
import { McqTest } from '@models/response/mcq-test.model';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class QuizService {
  private quizQuestionsSubject = new BehaviorSubject<McqTest[]>([]);
  quizQuestions$: Observable<McqTest[]> = this.quizQuestionsSubject.asObservable();

//   private quizResponseSubject = new BehaviorSubject<CheckTestResponse>(null);
//   quizQuestions$: Observable<McqTest[]> = this.quizQuestionsSubject.asObservable();

  setQuizQuestions(questions: McqTest[]) {
    this.quizQuestionsSubject.next(questions);
  }

  getQuizQuestions(): McqTest[] {
    return this.quizQuestionsSubject.getValue();
  }

  emptyQuizQuestions() {
    this.quizQuestionsSubject.next([]);
  }
}
