import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import {AspirantessolicitadosService} from '../../../servicios/aspirantessolicitados.service'

import {SolicitudService} from '../../../servicios/solicitud.service'
@Component({
  selector: 'app-oferta-empleo',
  templateUrl: './oferta-empleo.component.html',
  styleUrls: ['./oferta-empleo.component.css']
})
export class OfertaEmpleoComponent implements OnInit {
  aspirantessolicitados:any[]=[]; 
  aspirantessolicitados2:any[]=[]; 
  idAspirante ='';
  @ViewChild('empleos') aspirantessolicitadosHt: ElementRef;
  inner:string='';
  constructor(
    private _aspirantessolicitadosService: AspirantessolicitadosService,
    private _solicitudesService: SolicitudService
    ) { 
      
  }
  
  ngOnInit() {
    this._aspirantessolicitadosService.getAspirantessolicitados().subscribe((resp:any)=>{
      this.aspirantessolicitados=resp
      this.aspirantessolicitados2=resp
      this._solicitudesService.loginUsuario().subscribe((resp2:any)=>{
        this.byid(resp2);
        this.addhtml()
      });
      
    });
    
    
  }
  addhtml(){
	  for(let i=0;i<this.aspirantessolicitados2.length;i++){
      if(this.aspirantessolicitados2[i].aspirante_idaspirante.idaspirante==this.idAspirante){
        
        this.inner+=`
        <div class="empleo" >        
        <div class="card">
        <div class="card-body"> 
            <h2 class="card-title">Cargo: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.cargo}</h2>
            <h3>${this.aspirantessolicitados2[i].solicitud_idsolicitud.profesion}</h3> 
            <p></p>
            <ul>
              <li >Descripción: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.descripcioncargo}</li>
              <p></p>
              <li >Educacion minima: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.educacion_minima}</li>
              <li >Jornada:  ${this.aspirantessolicitados2[i].solicitud_idsolicitud.jornada} </li>
              <li >Licencia: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.licencia}</li>
              <li >Idiomas: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.idiomas}</li>
              <li >Personas con discapacidad: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.discapacidad}</li>
              <li >Disponibilidad de viajar: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.disponibilidad_viajar} </li>              
              <li >Disponibilidad de cambio de residencia: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.disponibilidad_viajar} </li>
            </ul>
            <p class="card-text">Empresa: ${this.aspirantessolicitados2[i].solicitud_idsolicitud.representante_idrepresentante.empresa_idempresa.nombrecomercial}</p>
            <ul>
              <li>Fecha de inicio ${this.aspirantessolicitados2[i].solicitud_idsolicitud.fechainicio}</li>
              <li>Fecha de cierre ${this.aspirantessolicitados2[i].solicitud_idsolicitud.fechacierre}</li>
            </ul>
            
            <button type="button">Aceptar</button>            
            <button type="button">Eliminar</button>
        </div>
        </div>
    </div>
  
    `;
      }
		 
	  }

	  this.aspirantessolicitadosHt.nativeElement.innerHTML=this.inner;
	  
  }

  byid(resp2){
  
  for(let i=0;i<this.aspirantessolicitados.length;i++){
    if(this.aspirantessolicitados[i].aspirante_idaspirante.usuario_idusuario.idusuario==resp2.idusuario){
      this.idAspirante =this.aspirantessolicitados[i].aspirante_idaspirante.idaspirante
      
    }
        
    } 
  }
  
}
