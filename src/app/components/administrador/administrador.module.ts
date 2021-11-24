import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AutorizarComponent } from './autorizar/autorizar.component';



@NgModule({
  declarations: [
    
    AspirantesAceptadosComponent,
    MenuLateralComponent,
    SesionAdministradorComponent,
    AspirantesNuevosComponent,
    RevisarSugerenciasComponent,
    RevisarEmpresasComponent,
    VistaPerfilAspiranteComponent,
    AutorizarComponent,
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
  ],

})
export class AdministradorModule { }