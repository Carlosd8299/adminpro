import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';

 const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data:{titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress bar'} },
          { path: 'grafica1', component: Grafica1Component , data:{titulo: 'Grafica N1'}},
          { path: 'account-settings', component: AccountSettingsComponent , data:{titulo: 'Tema'}},
          { path: 'promesa', component: PromesaComponent, data:{titulo: 'Promesa'} },
          { path: 'rxjs', component: RxjsComponent, data:{titulo: 'Rxjs'} },
          { path: 'perfil', component: PerfilComponent, data:{titulo: 'Perfil'} },
          { path: 'buscar/:termino', component: BusquedasComponent, data:{titulo: 'Busquedas'} },

          // Mantenimiento
          { path: 'usuarios',canActivate: [AdminGuard], component: UsuariosComponent, data:{titulo: 'Administracion de usuarios'} },
          { path: 'hospitales', component: HospitalesComponent, data:{titulo: 'Administracion de hospitales'} },
          { path: 'medicos', component: MedicosComponent, data:{titulo: 'Administracion de medicos'} },
          { path: 'medico/:id', component: MedicoComponent, data:{titulo: 'Administracion de medicos'} },
        ],
      },
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule {}
