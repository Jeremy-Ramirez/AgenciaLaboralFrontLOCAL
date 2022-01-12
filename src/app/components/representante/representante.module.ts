import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { FiltroComponent } from './filtro/filtro.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { SolicitudesContratacionComponent } from './solicitudes-contratacion/solicitudes-contratacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { MatIconModule } from '@angular/material/icon';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { VistaPerfilAspiranteComponent } from './vista-perfil-aspirante/vista-perfil-aspirante.component';
import { LoadingComponent } from './loading/loading.component';
import { FootComponent } from './foot/foot.component';

@NgModule({
  declarations: [
    MenuLateralComponent,
    PerfilRepresentanteComponent,
    SesionRepresentanteComponent,
    RegistroFullRepresentanteComponent,
    SugerenciasComentariosComponent,
    SolicitudesComponent,
    ShowsolicitudesComponent,
    FiltroComponent,
    SolicitudesContratacionComponent,
    SolicitudComponent,
    VistaPerfilAspiranteComponent,
    LoadingComponent,
    FootComponent,


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
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    AutocompleteLibModule,

    
  ],
})
export class RepresentanteModule { }