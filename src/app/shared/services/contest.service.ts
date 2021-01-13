import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IContestEdition} from '../interfaces/contest-edition.interface';
import {IContest} from '../interfaces/contest.interface';
import {IContestEditionEvent} from '../interfaces/contest-edition-event.interface';
import {shareReplay} from 'rxjs/operators';

interface IContestEditionResponse {
  total: number;
  data: IContestEdition[];
}

interface ILeaderBoard {
  userId: number;
  firstName: string;
  lastName: string;
  points: number
}
interface ILeaderBoardResponse {
  event: IContestEditionEvent,
  leaderboard: ILeaderBoard[]
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

  getContestEditionEventWithId = ({eventId, includeQuestions}: { eventId: number, includeQuestions: boolean }) =>
    this.httpClient.get<IContestEditionEvent>(`/contest-edition-events/${eventId}`,
      {params: {includeQuestions: String(+includeQuestions)}});

  submitContest({contestEventId, data}) {
    return this.httpClient.post(
      `/contest-edition-events/${contestEventId}/question-answers`,
      data.map(({id: questionId, selected: answerId}) => ({questionId, answerId})));
  }

  getLeaderboardForEvent({eventId}) {
    return this.httpClient
      .get<ILeaderBoardResponse>(`/contest-edition-events/${eventId}/leaderboard/`).pipe(
        shareReplay()
      )
  }
}
