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
        <h2 ><a >${this.aspirantessolicitados2[i].solicitud_idsolicitud.profesion}</a></h2>                
        <p>Descripcion, Ciudad, Provincia</p>
        <div class="card" style="width:400px">
        <div class="card-body"> 
            <p class="card-text">${this.aspirantessolicitados2[i].solicitud_idsolicitud.descripcioncargo}</p>
            <p class="card-text">${this.aspirantessolicitados2[i].solicitud_idsolicitud.representante_idrepresentante.empresa_idempresa.nombrecomercial}</p>
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
