import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IContestEdition} from '../interfaces/contest-edition.interface';
import {IContest} from '../interfaces/contest.interface';
import {IContestEditionEvent} from '../interfaces/contest-edition-event.interface';

interface IContestEditionResponse {
  total: number;
  data: IContestEdition[];
}

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  constructor(private httpClient: HttpClient) {
  }
  getContestEditions = ({page = 1, featured = false, size = 15} = {}) =>
    this.httpClient.get<IContestEditionResponse>(`/contest-editions/`, {
      params: {size: size.toString(), page: page.toString(), featured: featured.toString()}
    });

  getContestWithId = ({contestId}: { contestId: number }) => this.httpClient.get<IContest>(`/contests/${contestId}`);

  getContestEditionWithId = ({contestEditionId}: { contestEditionId: number }) =>
    this.httpClient.get<IContestEdition>(`/contest-editions/${contestEditionId}`);

  getContestEditionEventWithId = ({eventId}: {eventId: 1}) =>
    this.httpClient.get<IContestEditionEvent>(`/contest-edition-events/${eventId}`)
}
