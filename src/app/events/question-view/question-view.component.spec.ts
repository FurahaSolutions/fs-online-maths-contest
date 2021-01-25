import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {QuestionViewComponent} from './question-view.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MathModule} from '../../math/math.module';
import {RadioModule} from '../../radio/radio.module';
import {FormsModule} from '@angular/forms';

describe('QuestionViewComponent', () => {
  let component: QuestionViewComponent;
  let fixture: ComponentFixture<QuestionViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        MathModule,
        RadioModule,
        FormsModule
      ],
      declarations: [QuestionViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewComponent);
    component = fixture.componentInstance;
    component.question = {
      choices: [],
      points: 1,
      description: '',
      id: 1,
      tags: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('function selectChoice()', () => {
    it('should call onChanges', () => {
      component.question = {choices: [{id: 1, description: 'choice 1'}], description: '', id: 1, points: 1};
      component.registerOnChange(() => {});
      fixture.detectChanges();
      const spyOnChanges = spyOn(component, 'onChanges');
      component.selectChoice(0);
      expect(spyOnChanges).toHaveBeenCalled();
    });
  });
});
