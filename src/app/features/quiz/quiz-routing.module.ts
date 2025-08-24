import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizContainerComponent } from './quiz-container.component';

const routes: Routes = [
  {
    path: String.Empty,
    component: QuizContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
