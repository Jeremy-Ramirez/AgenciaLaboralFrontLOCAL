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
  idUsuariologeado ='';
  idAspirante ='';
  idAspiranteSolicitados ='';
  ofertasEmpleo: Array<OfertaView>= [];
  listaAspirantes:any[]=[];
  listaSolicitudes:any[]=[];
  listaRepresentantes:any[]=[];
  listaEmpresas:any[]=[];
  listaProfesiones:any[]=[];
  listaNivel:any[]=[];
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

      this.httpClient.get('http://localhost:8000/api/solicitudes/').subscribe((respSolicitudes:any)=>{
        this.listaSolicitudes=respSolicitudes;
      })
      this.httpClient.get('http://localhost:8000/api/aspirantes/').subscribe((respAspirantes:any)=>{
        this.listaAspirantes=respAspirantes;
      })
      this.httpClient.get('http://localhost:8000/api/representantes/').subscribe((respRepresentantes:any)=>{
        this.listaRepresentantes=respRepresentantes;
      })
      this.httpClient.get('http://localhost:8000/api/empresas/').subscribe((respEmpresas:any)=>{
        this.listaEmpresas=respEmpresas;
      })
      this.httpClient.get('http://localhost:8000/api/profesiones/').subscribe((respProfesiones:any)=>{
        this.listaProfesiones=respProfesiones;
      })
      this.httpClient.get('http://localhost:8000/api/nivelestudios/').subscribe((respNivel:any)=>{
        this.listaNivel=respNivel;
      })
      this.httpClient.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe((resp2:any)=>{
        this.idUsuariologeado= resp2.idusuario;
        this.addhtml();
        //this.addhtml2()
      })
      
    });
    
    
  }
  formEmpresa: FormGroup = this.form.group({
    estado_idestado: 2
  })
  formEmpresa2: FormGroup = this.form.group({
    estado_idestado: 3
  })
  
  yanosirve(){
    console.log(this.aspirantessolicitados2[2])
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

  addhtml(){
  var cont = 1; 
  for(let i=0;i<this.aspirantessolicitados.length;i++){
    for(let j=0;j<this.listaAspirantes.length;j++){
      if(this.listaAspirantes[j].idaspirante==this.aspirantessolicitados[i].aspirante_idaspirante){
        var idUsuario =this.listaAspirantes[j].usuario_idusuario
        if(this.idUsuariologeado==idUsuario ){ //&& (this.aspirantessolicitados[i].estado_idestado==1)
          for(let x=0;x<this.listaSolicitudes.length;x++){
            if(this.aspirantessolicitados[i].solicitud_idsolicitud==this.listaSolicitudes[x].idsolicitud){
              
              var oferta = new OfertaView();
              oferta.id = cont;
              oferta.estado =this.aspirantessolicitados[i].estado_idestado;
              oferta.cargo= this.listaSolicitudes[x].cargo
              for(let p=0;p<this.listaProfesiones.length;p++){
                if(this.listaProfesiones[p].idprofesiones==this.listaSolicitudes[x].profesiones_idprofesiones){
                  oferta.profesion = this.listaProfesiones[p].profesion
                }
              }   
             
              oferta.descripcioncargo =this.listaSolicitudes[x].descripcioncargo

              for(let n=0;n<this.listaNivel.length;n++){
                if(this.listaNivel[n].idnivelestudios==this.listaSolicitudes[x].nivelestudios_idnivelestudios){
                  oferta.nivelestudios = this.listaNivel[n].descripcion
                }
              } 
              
              oferta.jornada = this.listaSolicitudes[x].jornada
              oferta.licencia = this.listaSolicitudes[x].licencia
              oferta.idiomas = this.listaSolicitudes[x].idiomas
              oferta.discapacidad = this.listaSolicitudes[x].discapacidad
              oferta.posibilidadviajar = this.listaSolicitudes[x].posibilidadviajar
              oferta.posibilidadcambioresidencia = this.listaSolicitudes[x].posibilidadcambioresidencia
              for(let y=0;y<this.listaRepresentantes.length;y++){
                if(this.listaRepresentantes[y].idrepresentanteempresa==this.listaSolicitudes[x].representante_idrepresentante){
                  var idEmpresa =this.listaRepresentantes[y].empresa_idempresa
                  for(let e=0;e<this.listaEmpresas.length;e++){
                    if(this.listaEmpresas[e].idempresa==idEmpresa){
                      oferta.nombreEmpresa = this.listaEmpresas[y].nombrecomercial
                    }
                  }                  
                }
              }
              
              oferta.fechainicio = this.listaSolicitudes[x].fechainicio
              oferta.fechacierre = this.listaSolicitudes[x].fechacierre
        
              this.ofertasEmpleo.push(oferta);
              cont++;
            }
          }
        }
      }
    }
    }     
  }
  
  aceptar(idOferta) {
    console.log("numOferta " +  idOferta)
    console.log("enviado")
    if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }  
    //console.log(this.formEmpresa.value);
    this.httpClient.put('http://localhost:8000/api/aspirantessolicitados/'+idOferta, this.formEmpresa.value).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
    alert('OFERTA ACEPTADA')    
    window.location.reload()

  }
  rechazar(idOferta) {
    console.log("rechazado")
    console.log("numOferta " + idOferta)
    if(this.formEmpresa2.invalid) {
      return Object.values(this.formEmpresa2.controls).forEach(control=>{
        control.markAsTouched();
      })
    }  
    //console.log(this.formEmpresa2.value);
    this.httpClient.put('http://localhost:8000/api/aspirantessolicitados/'+idOferta, this.formEmpresa2.value).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
    alert('OFERTA RECHAZADA')
    
    window.location.reload()
  }
  
}
