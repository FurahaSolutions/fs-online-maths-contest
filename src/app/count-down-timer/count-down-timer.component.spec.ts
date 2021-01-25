import {ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {CountDownTimerComponent} from './count-down-timer.component';
import {take} from 'rxjs/operators';

import createSpyObj = jasmine.createSpyObj;

describe('CountDownTimerComponent', () => {
  let component: CountDownTimerComponent;
  let fixture: ComponentFixture<CountDownTimerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CountDownTimerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountDownTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as input "minutes"', waitForAsync(() => {
    component.minutes = 2/60;
    component.timer$.pipe(take(1)).subscribe({
      next: (x) => {
        expect(x).toBeTruthy();
      }
    });
  }));

  it('should set exam ended when time is up', waitForAsync(() => {
    window.MathJax = createSpyObj<typeof MathJax>([], ['Hub']);
    component.minutes = 1 / 60;
    component.timer$.pipe(take(1)).subscribe({
      next: (x) => {
        expect(x).toBeTruthy();
      }
    });
  }));
});
