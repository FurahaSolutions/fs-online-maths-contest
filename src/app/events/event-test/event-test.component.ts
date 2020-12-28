import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ContestService} from '../../shared/services/contest.service';
import {combineLatest} from 'rxjs';
import {faPlay} from '@fortawesome/free-solid-svg-icons/faPlay';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-event-test',
  templateUrl: './event-test.component.html',
  styleUrls: ['./event-test.component.scss']
})
export class EventTestComponent {
  faPlay = faPlay;
  questionsForm = this.fb.group({
    choices: this.fb.array([])
  });
  contestEvent$ = this.activatedRoute$.paramMap.pipe(
    map(params => Number(params.get('eventId'))),
    mergeMap(eventId =>
      this.contestService.getContestEditionEventWithId({eventId}))
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
  }

  submitContest() {
    this.contestService.submitContest(this.choices.value).subscribe();
  }
}
