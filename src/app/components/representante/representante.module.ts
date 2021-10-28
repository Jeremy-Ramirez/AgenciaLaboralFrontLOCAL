import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { PerfilRepresentanteComponent } from './perfil-representante/perfil-representante.component';
import { SesionRepresentanteComponent } from './sesion-representante/sesion-representante.component';
import { RepresentanteRoutingModule } from './representante-routing.module';
import { RegistroFullRepresentanteComponent } from './registro-full-representante/registro-full-representante.component';
import { SugerenciasComentariosComponent } from './sugerencias-comentarios/sugerencias-comentarios.component';

import { SolicitudesComponent } from '../representante/solicitudes/solicitudes.component';
import { ShowsolicitudesComponent } from './showsolicitudes/showsolicitudes.component';
@NgModule({
  declarations: [
    MenuLateralComponent,
    PerfilRepresentanteComponent,
    SesionRepresentanteComponent,
    RegistroFullRepresentanteComponent,
    SugerenciasComentariosComponent,
    SolicitudesComponent,
    ShowsolicitudesComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RepresentanteRoutingModule,
    RouterModule,
    
  ],
})
export class RepresentanteModule { }