import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { SesionEmpresaComponent } from './sesion-empresa/sesion-empresa.component';
import { RegistroRepresentanteComponent } from './registro-representante/registro-representante.component';
import { RegistroFullEmpresaComponent } from './registro-full-empresa/registro-full-empresa.component';
import { PerfilEmpresaComponent } from './perfil-empresa/perfil-empresa.component';
import { InformacionComponent } from './informacion/informacion.component';
import { SugerenciasComentariosComponent } from './sugerencias-comentarios/sugerencias-comentarios.component';
import { EditPassComponent } from './edit-pass/edit-pass.component';
import { SolicitudEmpresaComponent } from './solicitud-empresa/solicitud-empresa.component';

const routes: Routes = [
    {
      path: '',
      children: [
        
        { path: 'sesionEmpresa', component: SesionEmpresaComponent,
          children:[
            
            { path: 'registroRepresentante', component: RegistroRepresentanteComponent},
            { path: 'perfilEmpresa', component: PerfilEmpresaComponent},
            { path: 'informacionEmpresa', component: InformacionComponent},
            { path: 'sugerencias', component: SugerenciasComentariosComponent},
            { path: 'editpass', component: EditPassComponent},
            { path: 'solicitudEmpresa', component: SolicitudEmpresaComponent},
          ]
        },
        
        { path: 'registroEmpresa', component: RegistroEmpresaComponent},
        { path: 'registroFullEmpresa', component: RegistroFullEmpresaComponent},
        { path: '**', redirectTo: 'sesionEmpresa/perfilEmpresa' }
      ]
    }
  ];
  


  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ]
  })
  export class EmpresaRoutingModule { }