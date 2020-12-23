import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import {HeaderModule} from '../header/header.module';
import { EventTestComponent } from './event-test/event-test.component';


@NgModule({
  declarations: [EventsComponent, EventTestComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    HeaderModule
  ]
})
export class EventsModule { }
