import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




import { SesionAspiranteComponent } from './sesion-aspirante/sesion-aspirante.component';
import { OfertaEmpleoComponent } from './oferta-empleo/oferta-empleo.component';


import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AspiranteRoutingModule } from './aspirante-routing.module';
import { RegistroFullAspiranteComponent } from './registro-full-aspirante/registro-full-aspirante.component';
import { RegistroAspiranteComponent } from './registro-aspirante/registro-aspirante.component';
import { RouterModule } from '@angular/router';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PerfilAspiranteComponent } from './perfil-aspirante/perfil-aspirante.component';
import { SugerenciasComentariosComponent } from './sugerencias-comentarios/sugerencias-comentarios.component';
import { AspiranteProfesionalComponent } from './aspirante-profesional/aspirante-profesional.component';

@NgModule({
  declarations: [
    
    SesionAspiranteComponent,
    OfertaEmpleoComponent,
    RegistroAspiranteComponent,
    RegistroFullAspiranteComponent,
    MenuLateralComponent,
    PerfilAspiranteComponent,
    SugerenciasComentariosComponent,
    AspiranteProfesionalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AspiranteRoutingModule,
    RouterModule,
  ],

})
export class AspiranteModule { }