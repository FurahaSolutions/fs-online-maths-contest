// import {MathDirective} from './math.directive';
// import {TestBed, waitForAsync} from '@angular/core/testing';
// import {Component} from '@angular/core';
// import {MathModule} from './math.module';
//
// @Component({
//   template: `
//     <div [appMath]="{latex: 'description' }"></div>
//   `
// })
// export class AboutComponent {
// }
//
//
// describe('MathDirective', () => {
//   let fixture;
//   beforeEach(waitForAsync(() => {
//     fixture = TestBed.configureTestingModule({
//       imports: [MathModule],
//       declarations: [AboutComponent],
//       providers: []
//     })
//       .compileComponents();
//   }));
//
//
//   it('should create', () => {
//
//     fixture = TestBed.createComponent(AboutComponent);
//     const component = fixture.componentInstance;
//     expect(component).toBeTruthy();
//   });
// });


import {MathDirective} from './math.directive';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MathModule} from './math.module';

@Component({
  template: `
    <div class="item-1" [appMath]="{latex: 'description' }"></div>
    <div class="item-2" [appMath]="{mathml: 'description' }"></div>
  `
})
export class AboutComponent {
}


describe('MathDirective', () => {
  let fixture;
  let component;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MathModule.forRoot()],
      declarations: [AboutComponent, MathDirective],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
  }));


  it('should create', () => {
     const item1 = fixture.nativeElement.querySelector('.item-1');
     const item2 = fixture.nativeElement.querySelector('.item-2');
     expect(item1).toBeTruthy();
     expect(item2).toBeTruthy();
  });
});


