import {Component, Input} from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() loading = false;
  isLoading$ = this.loaderService.isLoading$;
  constructor(private loaderService: LoaderService) {
  }
}
