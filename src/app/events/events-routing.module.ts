import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from './events.component';
import {EventTestComponent} from './event-test/event-test.component';

const routes: Routes = [
  {
    path: ':eventId',
    children: [
      {
        path: '',
        component: EventsComponent
      },
      {
        path: 'test',
        component: EventTestComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
