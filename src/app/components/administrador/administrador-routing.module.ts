import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AspirantesAceptadosComponent } from './aspirantes-aceptados/aspirantes-aceptados.component';
import { SesionAdministradorComponent } from './sesion-administrador/sesion-administrador.component';
import { AspirantesNuevosComponent } from './aspirantes-nuevos/aspirantes-nuevos.component';
import { RevisarEmpresasComponent } from './revisar-empresas/revisar-empresas.component';
import { RevisarSugerenciasComponent } from './revisar-sugerencias/revisar-sugerencias.component';
import { VistaPerfilAspiranteComponent } from './vista-perfil-aspirante/vista-perfil-aspirante.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { PerfilAdministradorComponent } from '../../perfil-administrador/perfil-administrador.component';
import { AsignarAspiranteComponent } from './asignar-aspirante/asignar-aspirante.component';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { VistaPerfilEmpresasComponent } from './vista-perfil-empresas/vista-perfil-empresas.component';


const routes: Routes = [
    {
      path: '',
      children: [

        
        { path: 'sesionAdministrador', component: SesionAdministradorComponent,
          children:[
            { path: 'aspirantesAceptados', component: AspirantesAceptadosComponent},
            { path: 'aspirantesNuevos', component: AspirantesNuevosComponent},
            { path: 'asignarAspirante', component: AsignarAspiranteComponent},
            { path: 'perfilAdministrador', component: PerfilAdministradorComponent},
            { path: 'perfilAspirante/:id', component: VistaPerfilAspiranteComponent},
            { path: 'perfilEmpresa/:id', component: VistaPerfilEmpresasComponent},
            { path: 'empresas', component: RevisarEmpresasComponent},
            { path: 'revisarempresas', component: RevisarEmpresasComponent},
            
            { path: 'revisarempresas', component: RevisarEmpresasComponent},
            { path: 'autorizarEmpresas', component: AutorizarComponent},
          ]
        },
        { path: 'registroAdministrador', component: RegistroAdministradorComponent },
        { path: '**', redirectTo: 'sesionAdministrador/perfilAdministrador' }
      ]
    }
  ];
  
  
@NgModule({
    imports: [
      RouterModule.forChild(routes),
    ],
  })
  export class AdministradorRoutingModule { }