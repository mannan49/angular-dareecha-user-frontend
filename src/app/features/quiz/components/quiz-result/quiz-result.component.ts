import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, EMPTY, filter, take, tap } from 'rxjs';

import { Result } from '@models/entities/result.model';

import { ApiHttpService } from '@shared/services/api-http.service';
import { ChartDataset } from '@models/shared/chart-data-set.model';

@Component({
  selector: 'app-quiz-result',
  standalone: false,
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.css',
})
export class QuizResultComponent {
  result: Result;
  resultId = String.Empty;
  doughnutChartLabels: string[] = ['Correct', 'Wrong', 'Unattempted'];
  doughnutChartDatasets: ChartDataset[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private apiHttpService: ApiHttpService) {
    this.resultId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchResultData();
  }

  fetchResultData() {
    this.apiHttpService
      .getResultById(this.resultId)
      .pipe(
        take(1),
        filter((res: Result) => !!res),
        tap((res: Result) => {
          this.result = res;
          this.doughnutChartDatasets = [
            {
              data: [res.correct, res.wrong, res.unattempted],
              label: 'MCQs',
            },
          ];
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }
}
