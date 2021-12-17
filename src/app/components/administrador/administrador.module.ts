import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { AspirantesAceptadosComponent } from './aspirantes-aceptados/aspirantes-aceptados.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { SesionAdministradorComponent } from './sesion-administrador/sesion-administrador.component';
import { AspirantesNuevosComponent } from './aspirantes-nuevos/aspirantes-nuevos.component';
import { RevisarEmpresasComponent } from './revisar-empresas/revisar-empresas.component';
import { RevisarSugerenciasComponent } from './revisar-sugerencias/revisar-sugerencias.component';


import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { RouterModule } from '@angular/router';
import { VistaPerfilAspiranteComponent } from './vista-perfil-aspirante/vista-perfil-aspirante.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { AsignarAspiranteComponent } from './asignar-aspirante/asignar-aspirante.component';
import { AutorizarComponent } from './autorizar/autorizar.component';
import { VistaPerfilEmpresasComponent } from './vista-perfil-empresas/vista-perfil-empresas.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { LoadingComponent } from './loading/loading.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';




@NgModule({
  declarations: [
    
    AspirantesAceptadosComponent,
    MenuLateralComponent,
    SesionAdministradorComponent,
    AspirantesNuevosComponent,
    RevisarSugerenciasComponent,
    RevisarEmpresasComponent,
    VistaPerfilAspiranteComponent,
    RegistroAdministradorComponent,
    AsignarAspiranteComponent,
    AutorizarComponent,
    VistaPerfilEmpresasComponent,
    PerfilAdministradorComponent,
    LoadingComponent,
   
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
    AdministradorRoutingModule,
    RouterModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    
  ],

})
export class AdministradorModule { }