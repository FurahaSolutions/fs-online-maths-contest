import {Component} from '@angular/core';
import {ContestService} from '../shared/services/contest.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  contestEditions$ = this.contestService.getContestEditions({featured: true});

  constructor(private contestService: ContestService) {
  }

}
