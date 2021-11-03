import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AspirantesAceptadosComponent } from './aspirantes-aceptados/aspirantes-aceptados.component';
import { SesionAdministradorComponent } from './sesion-administrador/sesion-administrador.component';
import { AspirantesNuevosComponent } from './aspirantes-nuevos/aspirantes-nuevos.component';
import { RevisarEmpresasComponent } from './revisar-empresas/revisar-empresas.component';
import { RevisarSugerenciasComponent } from './revisar-sugerencias/revisar-sugerencias.component';
import { VistaPerfilAspiranteComponent } from './vista-perfil-aspirante/vista-perfil-aspirante.component';


const routes: Routes = [
    {
      path: '',
      children: [

        
        { path: 'sesionAdministrador', component: SesionAdministradorComponent,
          children:[
            { path: 'aspirantesAceptados', component: AspirantesAceptadosComponent},
            { path: 'aspirantesNuevos', component: AspirantesNuevosComponent},
            { path: 'perfilAspirante/:id', component: VistaPerfilAspiranteComponent},
            { path: 'empresas', component: RevisarEmpresasComponent},
            { path: 'sugerencias', component: RevisarSugerenciasComponent},
          ]
        },
        { path: '**', redirectTo: 'sesionAdministrador' }
      ]
    }
  ];
  
  
@NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
  })
  export class AdministradorRoutingModule { }