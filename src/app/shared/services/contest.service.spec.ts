import { TestBed } from '@angular/core/testing';

import { ContestService } from './contest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ContestService', () => {
  let service: ContestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ContestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
