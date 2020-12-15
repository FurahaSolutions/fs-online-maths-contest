import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {RouterTestingModule} from '@angular/router/testing';
import {take} from 'rxjs/operators';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Router} from '@angular/router';
import {LoginComponent} from '../../login/login/login.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: LoginComponent
        }]),
        FontAwesomeModule
      ],
      declarations: [HomeComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should have as title 'The Ultimate Maths Contest'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('The Ultimate Maths Contest');
  });
  it('should have a value for title after the 1st tick', done => {
    const app = fixture.componentInstance;
    app.titleDisplayTimer$.pipe(take(1)).subscribe({
      next: (letter) => {
        expect(letter).toBeDefined();
        done();
      }
    });
  });

  it('should navigate to the \'login\' page after title is displayed', done => {
    const app = fixture.componentInstance;
    app.typedTitleSubject$.next(app.title);
    spyOn<any>((app as any).router, 'navigate')
      .and.returnValue(new Promise(resolve => resolve(true)));
    app.redirectAfterDelay$.subscribe({
      next: (navigation) => {
        expect(navigation).toBeTruthy();
        done();
      }
    });
  });
});
