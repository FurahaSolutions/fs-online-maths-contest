import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IContestEdition} from '../interfaces/contest-edition.interface';
import {IContest} from '../interfaces/contest.interface';

interface IContestEditionResponse {
  total: number;
  data: IContestEdition[];
}

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  getContestEditions = ({page = 1, featured = false, size = 15} = {}) =>
    this.httpClient.get<IContestEditionResponse>(`/contest-editions/`, {
      params: {size: size.toString(), page: page.toString(), featured: featured.toString()}
    });

  constructor(private httpClient: HttpClient) {
  }

  getContestWithId = ({contestId}: { contestId: number }) => this.httpClient.get<IContest>(`/contests/${contestId}`);
}
