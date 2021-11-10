import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/shared/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { HttpClientModule } from '@angular/common/http';
import {TipodocumentoService} from './servicios/tipodocumento.service';
import {TipoempresaService} from './servicios/tipoempresa.service';
import {TipopersonaService} from './servicios/tipopersona.service';
import {GeneroService} from './servicios/genero.service';
import {RamaactividadService} from './servicios/ramaactividad.service';
import {ProvinciaService} from './servicios/provincia.service';
import {EmpresaService} from './servicios/empresa.service';
import {ActividadeconomicaService} from './servicios/actividadeconomica.service';
import {CiudadService} from './servicios/ciudad.service';
import {SectorService} from './servicios/sector.service';
import { SugerenciasComentariosComponent } from './components/representante/sugerencias-comentarios/sugerencias-comentarios.component';
import { AspiranteProfesionalComponent } from './components/aspirante/aspirante-profesional/aspirante-profesional.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    PortfolioComponent,
    FeedbackComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    SolicitudesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [TipodocumentoService,
    TipopersonaService,
    GeneroService,
    TipoempresaService,
    RamaactividadService,
    ProvinciaService,
    ActividadeconomicaService,
    CiudadService,
    EmpresaService,
    SectorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
