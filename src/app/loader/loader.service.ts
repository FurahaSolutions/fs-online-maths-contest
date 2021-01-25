import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading$ = new BehaviorSubject(false);
  startLoader = () => {
    this.isLoading$.next(true)
  }
  endLoader = () => this.isLoading$.next(false)
}
