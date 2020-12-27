import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {ContestService} from '../../shared/services/contest.service';
import {combineLatest} from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';

@Component({
  selector: 'app-event-test',
  templateUrl: './event-test.component.html',
  styleUrls: ['./event-test.component.scss']
})
export class EventTestComponent {
  faPlay = faPlay
  contestEvent$ = this.activatedRoute$.paramMap.pipe(
    map(params => Number(params.get('eventId'))),
    mergeMap(eventId =>
      this.contestService.getContestEditionEventWithId({eventId }))
  );

  questionNumbers$ = this.contestEvent$.pipe(
    map(({questions}) => questions.map(({points}, key) => {
      return ({
        position: key + 1,
        points: points,
        size: 2.5 * points / Math.min(...questions.map(({points}) => points)) + 'rem'
      })
    }))
  )
  v$ = combineLatest([this.contestEvent$, this.questionNumbers$]).pipe(
    map(([contestEvent,questionNumbers]) => ({
      contestEvent,
      questionNumbers
    }))
  )
  activeQuestion = 0;

  constructor(
    private activatedRoute$: ActivatedRoute,
    private contestService: ContestService) {
  }
}
