import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Modules
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

//Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule, 
    FormsModule,
    ChartsModule,
    PipesModule
  ],
})
export class PagesModule { }
