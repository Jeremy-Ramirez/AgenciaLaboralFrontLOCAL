import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SesionAspiranteComponent } from './sesion-aspirante/sesion-aspirante.component';
import { RegistroFullAspiranteComponent } from './registro-full-aspirante/registro-full-aspirante.component';
import { OfertaEmpleoComponent } from './oferta-empleo/oferta-empleo.component';
import { RegistroAspiranteComponent } from './registro-aspirante/registro-aspirante.component';
import { AspiranteProfesionalComponent } from './aspirante-profesional/aspirante-profesional.component';
import { PerfilAspiranteComponent } from './perfil-aspirante/perfil-aspirante.component';
import { SugerenciasComentariosComponent } from './sugerencias-comentarios/sugerencias-comentarios.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';


const routes: Routes = [
    {
      path: '',
      children: [

        
        { path: 'sesionAspirante', component: SesionAspiranteComponent,
          children:[
            { path: 'aspiranteProfesional', component: AspiranteProfesionalComponent},
            { path: 'ofertaEmpleo', component: OfertaEmpleoComponent },
            { path: 'perfilAspirante', component: PerfilAspiranteComponent },
            { path: 'sugerencias', component: SugerenciasComentariosComponent },
          ]
        },
        { path: 'registroAspirante', component: RegistroAspiranteComponent },
        { path: 'registroFullAspirante', component: RegistroFullAspiranteComponent },
        { path: '**', redirectTo: 'sesionAspirante' },
      ]
    }
  ];


  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ]
  })
  export class AspiranteRoutingModule { }