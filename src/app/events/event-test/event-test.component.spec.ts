import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EventTestComponent} from './event-test.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContestService} from '../../shared/services/contest.service';
import {of} from 'rxjs';
import {QuestionViewComponent} from '../question-view/question-view.component';
import {CountDownTimerModule} from '../../count-down-timer/count-down-timer.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MathModule} from '../../math/math.module';
import {take} from 'rxjs/operators';
import {RadioModule} from '../../radio/radio.module';

describe('EventTestComponent', () => {
  let component: EventTestComponent;
  let fixture: ComponentFixture<EventTestComponent>;
  let contestService: ContestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        CountDownTimerModule,
        FontAwesomeModule,
        MathModule,
        FormsModule,
        RadioModule
      ],
      declarations: [
        QuestionViewComponent,
        EventTestComponent
      ]
    })
      .compileComponents();
    contestService = TestBed.inject(ContestService);
    spyOn(contestService, 'getContestEditionEventWithId').and.returnValue(of({
      id: 1,
      name: 'asdf',
      eventPeriodInMinutes: 1,
      questions: [{
        id: 1,
        description: 'qwerty',
        points: 2,
        choices: [{id: 1, description: 'description 1'}]
      }]
    }));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('property "questions$"', () => {
    it('should update "choices"', done => {
      component.questions$.pipe(
        take(1)
      ).subscribe({
        next: () => {
          expect(component.choices.value).toEqual([{id: 1, selected: null}]);
          done();
        }
      });
    });
  });
  describe('function Submit submitContest()', ()=> {
    it('should call ', () => {
      const spySubmitContest = spyOn(contestService, 'submitContest').and.callThrough();
      component.submitContest();
      expect(spySubmitContest).toHaveBeenCalled();

    });
  });
});
