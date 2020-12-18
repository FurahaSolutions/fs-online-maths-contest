import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ContestService} from '../shared/services/contest.service';
import {IContest} from '../shared/interfaces/contest.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  contests$: Observable<IContest[]> = this.contestService.featuredContests$;

  constructor(private contestService: ContestService) {
  }

}
