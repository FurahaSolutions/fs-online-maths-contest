import {Constructor} from './constructor.mixin';
import {BehaviorSubject} from 'rxjs';
import {IToken} from '../../login/services/auth.service';

export const tokenMixin = <T extends Constructor>(baseClass: T = class {
} as T) =>
  class extends baseClass {
    getStoredUser = (storageMethod: typeof localStorage | typeof sessionStorage) =>
      JSON.parse(String(storageMethod.getItem('token')));

    get storedToken(): IToken | null {
      return this.getStoredUser(sessionStorage) || this.getStoredUser(localStorage);
    }
  };
