import {Constructor} from './constructor.mixin';
import {BehaviorSubject} from 'rxjs';

export const titleMixin = <T extends Constructor>(baseClass: T = class {
} as T) =>
  class extends baseClass {
    title = 'The Ultimate Maths Contest';
    typedTitleSubject$ = new BehaviorSubject('');
    title$ = this.typedTitleSubject$.asObservable();
  };
