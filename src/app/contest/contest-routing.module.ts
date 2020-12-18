import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContestDashboardComponent} from './contest-dashboard/contest-dashboard.component';
import {ContestEditionDashboardComponent} from './contest-edition-dashboard/contest-edition-dashboard.component';

const routes: Routes = [
  {
    path: ':contestId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ContestDashboardComponent
      },
      {
        path: 'editions/:editionId',
        component: ContestEditionDashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestRoutingModule {
}
