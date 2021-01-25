import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'appOrdinal'})
export class OrdinalPipe implements PipeTransform {
  transform(value: number): string {
    return (['st', 'nd', 'rd'][((value + 90) % 100 - 10) % 10 - 1] || 'th');
  }
}

