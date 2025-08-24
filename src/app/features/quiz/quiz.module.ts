import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { QuizRoutingModule } from './quiz-routing.module';

import { QuizContainerComponent } from './quiz-container.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { InputComponent } from '@shared/components/input/input.component';

@NgModule({
  declarations: [
    QuizFormComponent,
    QuizResultComponent,
    QuizContainerComponent,
  ],
  imports: [CommonModule, QuizRoutingModule, ReactiveFormsModule,InputComponent],
})
export class QuizModule {}
