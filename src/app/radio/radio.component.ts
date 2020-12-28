import {Component, forwardRef, Input} from '@angular/core';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons/faCheckCircle';
import {faCircle} from '@fortawesome/free-regular-svg-icons/faCircle';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements ControlValueAccessor {

// eslint-disable-next-line
  @Input('item-index') itemIndex;
  faCheckCircle = faCheckCircle;
  faCircle = faCircle;
  value: boolean;
  onChanges: any;
  onTouched: any;

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  clickHandler() {
    this.onChanges(this.value);
    this.onTouched();
  }
}
