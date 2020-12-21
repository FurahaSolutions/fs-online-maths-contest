import {Component} from '@angular/core';
import {ContestService} from '../../shared/services/contest.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-contest-edition-dashboard',
  templateUrl: './contest-edition-dashboard.component.html',
  styleUrls: ['./contest-edition-dashboard.component.scss']
})
export class ContestEditionDashboardComponent {

  contestEdition$ = this.activatedRoute.paramMap.pipe(
    map(params => ({contestEditionId : Number(params.get('editionId'))})),
    mergeMap(this.contestService.getContestEditionWithId)
  );

  constructor(private contestService: ContestService, private activatedRoute: ActivatedRoute) {
  }

}
