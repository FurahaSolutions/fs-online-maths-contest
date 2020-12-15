import {Component} from '@angular/core';
import {concat, from, interval, Observable, of, timer} from 'rxjs';
import {concatMap, delay, filter, ignoreElements, map, mergeMap, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {titleMixin} from '../../../shared/mixins/title.mixin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends titleMixin() {

  titleDisplayTimer$ = from(this.title).pipe(concatMap(this.typeEffect.bind(this))).pipe(
    tap(y => this.typedTitleSubject$.next(this.typedTitleSubject$.value + y))
  );

  redirectAfterDelay$ = timer(0, 60).pipe(
    filter(() => this.typedTitleSubject$.value.length === this.title.length),
    delay(2000)
  ).pipe(mergeMap(() => from(this.router.navigate(['/login']))));

  constructor(private router: Router) {
    super();
  }

  type = ({word, speed}) =>
    interval(speed).pipe(
      map(x => word.substr(0, x + 1)),
      take(word.length)
    )

  typeEffect(word): Observable<any> {
    return concat(
      this.type({word, speed: 60}), // type
      of('').pipe(delay(60), ignoreElements()), // pause
    );
  }
}

