import {Constructor} from './constructor.mixin';
import {BehaviorSubject, Subject} from 'rxjs';
import {IToken} from '../../login/services/auth.service';
import {OnDestroy} from '@angular/core';

export const unsubscribeMixin = <T extends Constructor>(baseClass: T = class {
} as T) =>
  class extends baseClass implements OnDestroy{
    destroyed$ = new Subject();
    ngOnDestroy() {
      this.destroyed$.next();
    }
  };
