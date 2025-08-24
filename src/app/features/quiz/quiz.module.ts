import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { QuizRoutingModule } from './quiz-routing.module';

import { QuizContainerComponent } from './quiz-container.component';
import { InputComponent } from '@shared/components/input/input.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';
import { QuizDiplayComponent } from './components/quiz-diplay/quiz-diplay.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { MultiSelectComponent } from '@shared/components/multi-select/multi-select.component';
import { DoughnutChartComponent } from '@shared/components/doughnut-chart/doughnut-chart.component';

import { QuizService } from './services/quiz.service';

@NgModule({
  declarations: [
    QuizFormComponent,
    QuizDiplayComponent,
    QuizResultComponent,
    QuestionCardComponent,
    QuizContainerComponent,
  ],
  imports: [
    CommonModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    QuizRoutingModule,
    ReactiveFormsModule,
    MultiSelectComponent,
    DoughnutChartComponent,
  ],
  providers: [QuizService],
})
export class QuizModule {}
