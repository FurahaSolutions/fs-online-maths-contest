import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {ContestService} from '../shared/services/contest.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  event$ = this.activatedRoute.paramMap.pipe(
    map(params => ({eventId: Number(params.get('eventId'))})),
    mergeMap(this.contestService.getContestEditionEventWithId)
  );
  constructor(
    private activatedRoute: ActivatedRoute,
    private contestService: ContestService) {
  }

}
