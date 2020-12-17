import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';

interface IContest {
  id: number;
  name: string;
  contestId?: number;
  status?: 'upcoming' | 'in-progress' | 'completed';
  description?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  contests$: Observable<IContest[]> = of([
    {id: 1, name: 'The Item Online Maths Contest', status: 'upcoming', contestId: 1, },
    {id: 2, name: 'The Maseno Online Maths Contest', status: 'in-progress', contestId: 2},
    {id: 3, name: 'The Alliance Online Maths Contest ', status: 'completed', contestId: 3},
    {id: 4, name: 'The Maranda Online Maths Contest', status: 'completed', contestId: 2},
    {id: 5, name: 'The Maranda Online Maths Contest', status: 'upcoming', contestId: 2},
  ]);

  constructor() {
  }

}
