import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {exhaustMap, map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {ContestService} from '../../shared/services/contest.service';
import {combineLatest} from 'rxjs';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay';
import {FormArray, FormBuilder} from '@angular/forms';
import {unsubscribeMixin} from '../../shared/mixins/unsubscribe.mixin';

@Component({
  selector: 'app-event-test',
  templateUrl: './event-test.component.html',
  styleUrls: ['./event-test.component.scss']
})
export class EventTestComponent extends unsubscribeMixin() {
  faPlay = faPlay;
  questionsForm = this.fb.group({
    choices: this.fb.array([])
  });

  contestEventId$ = this.activatedRoute$.paramMap.pipe(
    map(params => Number(params.get('eventId')))
  );
  contestEvent$ = this.contestEventId$.pipe(
    mergeMap(eventId =>
      this.contestService.getContestEditionEventWithId({eventId, includeQuestions: true}))
  );
  questions$ = this.contestEvent$.pipe(
    map(({questions}) => questions),
    tap(questions => {

      while (this.choices.length) {
        this.choices.removeAt(0);
      }
      questions.forEach(item => this.choices.push(this.fb.control({
        id: item.id,
        selected: null
      })));
    })
  );

  questionNumbers$ = this.questions$.pipe(
    map((questions) => questions.map(({points}, key) => ({
      position: key + 1,
      points,
      size: 2.5 * points / Math.min(...questions.map(({points: rem}) => rem)) + 'rem'
    })))
  );

  v$ = combineLatest([this.questions$, this.contestEvent$, this.questionNumbers$]).pipe(
    map(([questions, contestEvent, questionNumbers]) => ({
      questions,
      contestEvent,
      questionNumbers
    }))
  );
  activeQuestion = 0;

  get choices() {
    return this.questionsForm.get('choices') as FormArray;
  }

  constructor(
    private activatedRoute$: ActivatedRoute,
    private contestService: ContestService,
    private fb: FormBuilder
  ) {
    super();
  }

  submitContest() {

    this.contestEventId$.pipe(
      exhaustMap(contestEventId => this.contestService.submitContest({
        contestEventId,
        data: this.choices.value
      })),
      takeUntil(this.destroyed$)
    ).subscribe();
  }
}
