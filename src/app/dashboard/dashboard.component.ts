import {Component, OnInit} from '@angular/core';
import {ContestService} from '../shared/services/contest.service';
import {debounceTime, map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  defaultParams$ = {size: 15, featured: true, page: 1};
  searchSubject$ = new BehaviorSubject(this.defaultParams$);
  contestEditionsResponse$ = this.searchSubject$.pipe(
    switchMap(this.contestService.getContestEditions)
  );
  contestEditions$ = this.contestEditionsResponse$.pipe(map(({data}) => data));
  total$ = this.contestEditionsResponse$.pipe(map(({total}) => total));
  searchForm = this.formBuilder.group({
    size: [this.defaultParams$.size, [Validators.required]],
    featured: [this.defaultParams$.featured, [Validators.required]],
    page: [this.defaultParams$.page, [Validators.required]]
  });

  constructor(private contestService: ContestService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      tap(value => this.searchSubject$.next(value))
    ).subscribe();
  }

}
