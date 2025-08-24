import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDiplayComponent } from './quiz-diplay.component';

describe('QuizDiplayComponent', () => {
  let component: QuizDiplayComponent;
  let fixture: ComponentFixture<QuizDiplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizDiplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizDiplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
