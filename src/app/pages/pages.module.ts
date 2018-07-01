import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule
  ],
})
export class PagesModule { }
