import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Number2AlphabetModule} from '../number-2-alphabet/number-2-alphabet.module';



@NgModule({
  declarations: [RadioComponent],
  exports: [
    RadioComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    Number2AlphabetModule
  ]
})
export class RadioModule { }
