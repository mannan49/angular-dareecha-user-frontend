import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizContainerComponent } from './quiz-container.component';
import { QuizDiplayComponent } from './components/quiz-diplay/quiz-diplay.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: QuizContainerComponent
  },
  {
    path: "attempt/:id",
    component: QuizDiplayComponent
  },
  {
    path: "result/:id",
    component: QuizResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
