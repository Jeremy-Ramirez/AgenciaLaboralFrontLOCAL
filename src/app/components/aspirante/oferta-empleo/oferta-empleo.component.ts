import { Component, OnInit,ViewChild ,ElementRef, Input} from '@angular/core';
import {AspirantessolicitadosService} from '../../../servicios/aspirantessolicitados.service'
import { OfertaView } from '../clases/oferta';
import {SolicitudService} from '../../../servicios/solicitud.service'
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-oferta-empleo',
  templateUrl: './oferta-empleo.component.html',
  styleUrls: ['./oferta-empleo.component.css']
})
export class OfertaEmpleoComponent implements OnInit {
  aspirantessolicitados:any[]=[]; 
  aspirantessolicitados2:any[]=[]; 
  idAspirante ='';
  idAspiranteSolicitados ='1';
  ofertasEmpleo: Array<OfertaView>= [];

  constructor(
    private _aspirantessolicitadosService: AspirantessolicitadosService,
    private _solicitudesService: SolicitudService,    
    private httpClient:HttpClient,
    private form: FormBuilder,
    ) { 
      
  }
  
  ngOnInit() {
   
    this._aspirantessolicitadosService.getAspirantessolicitados().subscribe((resp:any)=>{
      this.aspirantessolicitados=resp
      this.aspirantessolicitados2=resp
      this.aspiranteSolicitado(resp)
      this._solicitudesService.loginUsuario().subscribe((resp2:any)=>{
        this.idUsuarioLogin(resp2);
        this.addhtml2()
      });
      
    });
    
  }
  formEmpresa: FormGroup = this.form.group({
    estado_idestado: 2
  })
  addhtml2(){
    
    for(let i=0;i<this.aspirantessolicitados2.length;i++){
      if(this.aspirantessolicitados2[i].aspirante_idaspirante.idaspirante==this.idAspirante
        && this.aspirantessolicitados2[i].estado_idestado.estado =="activo"){
        var oferta = new OfertaView();
        oferta.id = i;
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
  aspiranteSolicitado(resp){
    //this.idAspiranteSolicitados=resp.idaspirantessolicitados
    
  }
  aceptar(idOferta) {
    console.log("numOferta " +  idOferta)
    console.log("enviado")
    /*if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
  
      console.log(this.formEmpresa.value);
      this.httpClient.put('http://localhost:8000/api/aspirantessolicitados/'+this.idAspiranteSolicitados, this.formEmpresa.value).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )*/
    alert('OFERTA ACEPTADA')    
  }
  rechazar(idOferta) {
    console.log("rechazado")
    console.log("numOferta " + idOferta)
    alert('OFERTA RECHAZADA')
  }
 
}
