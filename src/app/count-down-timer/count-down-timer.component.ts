import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BehaviorSubject, Subject, timer} from 'rxjs';
import {map, repeatWhen, switchMap, takeUntil, takeWhile, tap} from 'rxjs/operators';

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountDownTimerComponent {
  warn$ = new Subject<boolean>();
  danger$ = new Subject<boolean>();
  initialMinutes$ = new BehaviorSubject(60);
  expired$ = new Subject();
  examEndedSubject$ = new Subject<boolean>();

  @Input()
  set minutes(val) {
    this.initialMinutes$.next(val);
  }

  timer$ = this.initialMinutes$.pipe(
    switchMap(minutes => timer(1000, 1000).pipe(
      map(t => minutes * 60 - t),
      tap(t => {
        if (t < 0) {
          this.examEndedSubject$.next(true);
        }
      }),
      tap(t => {
        if ((t / (minutes * 60)) < 0.125) {
          this.warn$.next(true);
        }
        if ((t / (minutes * 60)) < 0.05) {
          this.danger$.next(true);
        }
      }),
      takeUntil(this.expired$),
      tap(seconds => {
        if (seconds < 0) {
          this.expired$.next();
        }
      }),
      map(seconds => ({
        h: Math.max(Math.floor(seconds / 3600), 0),
        min: Math.max(Math.floor((seconds % 3600) / 60), 0),
        s: (seconds % 60)
      })),
      map(({h, min, s}) => ({
        h: h.toString().padStart(2, '0'),
        min: min.toString().padStart(2, '0'),
        s: s.toString().padStart(2, '0'),
      })),
    ))
  );


}
