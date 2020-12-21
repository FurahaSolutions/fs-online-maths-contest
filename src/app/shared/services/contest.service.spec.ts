import { TestBed } from '@angular/core/testing';

import { ContestService } from './contest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('ContestService', () => {
  let service: ContestService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContestService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('function getContestEditions()', () => {
    it('should return an Observable', done => {
      spyOn(httpClient, 'get').and.returnValue(of({total: 0, data: []}));
      service.getContestEditions().subscribe({
        next: res => {
          expect(res).toEqual({total: 0, data: []});
          done();
        }
      });
    });
  });
});
