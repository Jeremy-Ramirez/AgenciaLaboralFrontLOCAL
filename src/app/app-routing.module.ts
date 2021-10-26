import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/shared/main/main.component';
import { SugerenciasComentariosComponent } from './components/representante/sugerencias-comentarios/sugerencias-comentarios.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { AspiranteProfesionalComponent } from './components/aspirante/aspirante-profesional/aspirante-profesional.component';


const routes: Routes = [  
  { path: '', pathMatch: 'full', redirectTo: 'main', },
  //{ path: 'registroRepresentante/:id', component: RegistroFullRepresentanteComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'solicitudes', component: SolicitudesComponent },
  { path: 'datosProfesionales', component: AspiranteProfesionalComponent},
  { path: 'sugerencias', component: SugerenciasComentariosComponent},
 

  { 
    path: 'empresa',
    loadChildren: () => import('./components/empresa/empresa.module').then( m => m.EmpresaModule )
  },
  { 
    path: 'aspirante',
    loadChildren: () => import('./components/aspirante/aspirante.module').then( m => m.AspiranteModule )
  },
  { 
    path: 'administrador',
    loadChildren: () => import('./components/administrador/administrador.module').then( m => m.AdministradorModule )
  },
  { 
    path: 'representante',
    loadChildren: () => import('./components/representante/representante.module').then( m => m.RepresentanteModule )
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
