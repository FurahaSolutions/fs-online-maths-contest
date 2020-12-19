import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IContestEdition} from '../interfaces/contest-edition.interface';

@Injectable({
  providedIn: 'root'
})
export class ContestService {
  getContestEditions = ({page = 1, featured = false, size = 15} = {}) =>
    this.httpClient.get<IContestEdition[]>(`/contest-editions/`, {
      params: {page: page.toString(), featured: featured.toString()}
    });

  constructor(private httpClient: HttpClient) {
  }
}
