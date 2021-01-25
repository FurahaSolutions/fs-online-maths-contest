import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {ContestService} from '../../shared/services/contest.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {

  eventLeaderboard$ = this.activatedRoute.paramMap.pipe(
    map(params => params.get('eventId')),
    mergeMap(eventId => this.contestService.getLeaderboardForEvent({eventId}))
  )

  constructor(private activatedRoute: ActivatedRoute, private contestService: ContestService) { }
}
