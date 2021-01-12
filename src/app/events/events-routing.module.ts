import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from './events.component';
import {EventTestComponent} from './event-test/event-test.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';

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
      },
      {
        path: 'leaderboard',
        loadChildren: () => import('./leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
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
