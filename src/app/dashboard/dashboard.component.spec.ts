import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from '../header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {OrdinalModule} from '../shared/pipes/ordinal/ordinal.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ContestService} from '../shared/services/contest.service';
import {of} from 'rxjs';
import {take} from 'rxjs/operators';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let contestService: ContestService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, OrdinalModule, ReactiveFormsModule],
      declarations: [DashboardComponent, HeaderComponent],
    })
      .compileComponents();

    contestService = TestBed.inject(ContestService);
    spyOn(contestService, 'getContestEditions').and.returnValue(of({
      total: 23,
      data: []
    }));

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('total$ Observable', () => {
    it('should return 23 if response total has total as 23 ', () => {
      component.total$.subscribe({
        next: total => {
          expect(total).toBe(23);
        }
      });
    });
  });
  it('should ', (done) => {
    component.searchFormValueChanges$.pipe(take(1)).subscribe({
      next: res => {
        expect(component.searchSubject$.value).toEqual(res);
        done();
      }
    });
    component.searchForm.setValue({ size: 4, featured: true, page: 1})
  });
});
