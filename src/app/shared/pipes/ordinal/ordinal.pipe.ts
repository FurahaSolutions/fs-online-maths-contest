import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ordinal' })
export class OrdinalPipe implements PipeTransform {
  transform = (value: number): string => (["st", "nd", "rd"][((value + 90) % 100 - 10) % 10 - 1] || "th")
}

