import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {MathContent, MathService} from './math.service';
import {take, takeUntil, tap} from 'rxjs/operators';
import {unsubscribeMixin} from '../shared/mixins/unsubscribe.mixin';

@Directive({
  selector: '[appMath]'
})
export class MathDirective extends unsubscribeMixin() implements OnInit {

  @Input()
  private appMath: MathContent;
  private readonly elNativeElement: HTMLElement;

  constructor(private mathService: MathService, private el: ElementRef) {
    super();
    this.elNativeElement = el.nativeElement as HTMLElement;
  }

  ngOnInit(): void {

    this.mathService.ready().pipe(
      take(1),
      takeUntil(this.destroyed$),
      tap(() => this.mathService.render(this.elNativeElement, this.appMath))
    ).subscribe();
  }
}
