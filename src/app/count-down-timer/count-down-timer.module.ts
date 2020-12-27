import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountDownTimerComponent } from './count-down-timer.component';



@NgModule({
  declarations: [CountDownTimerComponent],
  exports: [
    CountDownTimerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CountDownTimerModule { }
