import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { RadioComponent } from './radio.component';
import {Number2AlphabetModule} from '../number-2-alphabet/number-2-alphabet.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [Number2AlphabetModule, FontAwesomeModule ],
      declarations: [ RadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('function clickHandler', ()=> {
    it('should call onChanges', () => {
      component.registerOnChange(() => {});
      component.registerOnTouched(() => {});
      fixture.detectChanges();
      const spyOnChanges = spyOn(component, 'onChanges');
      component.clickHandler();
      expect(spyOnChanges).toHaveBeenCalled();
    });
  });
});
