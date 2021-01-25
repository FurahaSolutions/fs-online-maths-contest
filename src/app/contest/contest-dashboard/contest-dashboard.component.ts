import {Component} from '@angular/core';
import {ContestService} from '../../shared/services/contest.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-contest-dashboard',
  templateUrl: './contest-dashboard.component.html',
  styleUrls: ['./contest-dashboard.component.scss']
})
export class ContestDashboardComponent {

  contestEditions$ = this.activatedRoute.paramMap.pipe(
    map((params) => Number(params.get('contestId'))),
    mergeMap(contestId => this.contestService.getContestWithId({contestId}))
  );

  constructor(private contestService: ContestService, private activatedRoute: ActivatedRoute) {
  }


}
