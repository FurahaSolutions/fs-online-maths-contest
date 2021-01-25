import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LeaderboardRoutingModule} from './leaderboard-routing.module';
import {LeaderboardComponent} from './leaderboard.component';
import {HeaderModule} from '../../header/header.module';


@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    HeaderModule,
    CommonModule,
    LeaderboardRoutingModule

  ]
})
export class LeaderboardModule {
}
