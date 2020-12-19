import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestRoutingModule } from './contest-routing.module';
import { ContestDashboardComponent } from './contest-dashboard/contest-dashboard.component';
import { ContestEditionDashboardComponent } from './contest-edition-dashboard/contest-edition-dashboard.component';
import {HeaderModule} from '../header/header.module';


@NgModule({
  declarations: [ContestDashboardComponent, ContestEditionDashboardComponent],
  imports: [
    CommonModule,
    ContestRoutingModule,
    HeaderModule
  ]
})
export class ContestModule { }
