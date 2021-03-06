import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

//Guards
import { LoginGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from 'src/app/pages/busqueda/busqueda.component';

const routes: Routes = [
    // {  
        // path: '', 
        // component: PagesComponent,
        // canActivate: [LoginGuard],
        // children: [
            { 
                path: 'dashboard', 
                component: DashboardComponent, 
                data: { titulo: 'Dashboard' },
                canActivate: [VerificaTokenGuard] 
            },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }  },
            { path: 'graficas', component: Graficas1Component, data: { titulo: 'Graficas' }  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables' }  },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }  },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil' }  },
            { path: 'busqueda/:query', component: BusquedaComponent, data: { titulo: 'Buscador' }  },
            
            //Mantenimiento
            { 
                path: 'usuarios', 
                component: UsuariosComponent, 
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de usuarios' }  
            },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' }  },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' }  },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    //     ]
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
