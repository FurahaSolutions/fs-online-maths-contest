import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeaderModule} from '../header/header.module';
import {OrdinalModule} from '../shared/pipes/ordinal/ordinal.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    OrdinalModule
  ]
})
export class DashboardModule {
}
