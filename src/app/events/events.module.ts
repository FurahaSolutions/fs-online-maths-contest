import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {HeaderModule} from '../header/header.module';
import { EventTestComponent } from './event-test/event-test.component';
import {CountDownTimerModule} from '../count-down-timer/count-down-timer.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { QuestionViewComponent } from './question-view/question-view.component';


@NgModule({
  declarations: [EventsComponent, EventTestComponent, QuestionViewComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    HeaderModule,
    CountDownTimerModule,
    FontAwesomeModule
  ]
})
export class EventsModule { }
