import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdinalPipe} from './ordinal.pipe';

@NgModule({
  declarations: [
    OrdinalPipe
  ],
  exports: [
    OrdinalPipe
  ],
  imports: [
    CommonModule
  ]
})
export class OrdinalModule {
}
