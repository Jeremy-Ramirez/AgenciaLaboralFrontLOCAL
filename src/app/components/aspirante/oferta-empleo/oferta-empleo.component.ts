import { Component, OnInit,ViewChild ,ElementRef, Input} from '@angular/core';
import {AspirantessolicitadosService} from '../../../servicios/aspirantessolicitados.service'
import { OfertaView } from '../clases/oferta';
import {SolicitudService} from '../../../servicios/solicitud.service'
@Component({
  selector: 'app-oferta-empleo',
  templateUrl: './oferta-empleo.component.html',
  styleUrls: ['./oferta-empleo.component.css']
})
export class OfertaEmpleoComponent implements OnInit {
  aspirantessolicitados:any[]=[]; 
  aspirantessolicitados2:any[]=[]; 
  aspi:any[]=[];
  idAspirante ='';
  ofertasEmpleo: Array<OfertaView>= [];

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
        this.idUsuarioLogin(resp2);
        this.addhtml2()
      });
      
    });
    
  }
  addhtml2(){
    
    for(let i=0;i<this.aspirantessolicitados2.length;i++){
      if(this.aspirantessolicitados2[i].aspirante_idaspirante.idaspirante==this.idAspirante){
        var oferta = new OfertaView();
        oferta.cargo= this.aspirantessolicitados2[i].solicitud_idsolicitud.cargo
        oferta.profesion =this.aspirantessolicitados2[i].solicitud_idsolicitud.profesion
        oferta.descripcioncargo =this.aspirantessolicitados2[i].solicitud_idsolicitud.descripcioncargo
        oferta.nivelestudios = this.aspirantessolicitados2[i].solicitud_idsolicitud.nivelestudios_idnivelestudios.descripcion
        oferta.jornada = this.aspirantessolicitados2[i].solicitud_idsolicitud.jornada
        oferta.licencia = this.aspirantessolicitados2[i].solicitud_idsolicitud.licencia
        oferta.idiomas = this.aspirantessolicitados2[i].solicitud_idsolicitud.idiomas
        oferta.discapacidad = this.aspirantessolicitados2[i].solicitud_idsolicitud.discapacidad
        oferta.posibilidadviajar = this.aspirantessolicitados2[i].solicitud_idsolicitud.posibilidadviajar        
        oferta.posibilidadcambioresidencia = this.aspirantessolicitados2[i].solicitud_idsolicitud.posibilidadcambioresidencia
        oferta.nombreEmpresa = this.aspirantessolicitados2[i].solicitud_idsolicitud.representante_idrepresentante.empresa_idempresa.nombrecomercial
        oferta.fechainicio = this.aspirantessolicitados2[i].solicitud_idsolicitud.fechainicio
        oferta.fechacierre = this.aspirantessolicitados2[i].solicitud_idsolicitud.fechacierre
        



        this.ofertasEmpleo.push(oferta);
      }
      
    }
  }

  idUsuarioLogin(resp2){
  
  for(let i=0;i<this.aspirantessolicitados.length;i++){
    if(this.aspirantessolicitados[i].aspirante_idaspirante.usuario_idusuario.idusuario==resp2.idusuario){
      this.idAspirante =this.aspirantessolicitados[i].aspirante_idaspirante.idaspirante
    }
    } 
  }
  
  aceptar() {
    console.log("enviado")
    alert('OFERTA ACEPTADA')
  }
  rechazar() {
    console.log("enviado")
    alert('OFERTA RECHAZADA')
  }
}
