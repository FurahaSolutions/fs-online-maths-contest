import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IContest} from '../interfaces/contest.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  featuredContests$: Observable<IContest[]> = this.httpClient.get<IContest[]>('/contests/?featured');

  constructor(private httpClient: HttpClient) {
  }
}
