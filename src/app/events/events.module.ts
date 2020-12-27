import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {HeaderModule} from '../header/header.module';
import { EventTestComponent } from './event-test/event-test.component';
import {CountDownTimerModule} from '../count-down-timer/count-down-timer.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { QuestionViewComponent } from './question-view/question-view.component';
import {MathModule} from '../math/math.module';
import {Number2AlphabetModule} from '../number-2-alphabet/number-2-alphabet.module';


@NgModule({
  declarations: [EventsComponent, EventTestComponent, QuestionViewComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    HeaderModule,
    CountDownTimerModule,
    FontAwesomeModule,
    MathModule,
    Number2AlphabetModule
  ]
})
export class EventsModule { }
