import {Constructor} from './constructor.mixin';
import {BehaviorSubject} from 'rxjs';

export const titleMixin = <T extends Constructor>(BaseClass: T = class {
} as T) =>
  class extends BaseClass {
    title = 'The Ultimate Maths Contest';
    typedTitleSubject$ = new BehaviorSubject('');
    title$ = this.typedTitleSubject$.asObservable();
  };
