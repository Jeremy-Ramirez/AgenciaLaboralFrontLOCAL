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
  listaCiudades:any[]=[];
  listaProvincias:any[]=[];
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
      this.httpClient.get('http://localhost:8000/api/ciudades/').subscribe((respCiudades:any)=>{
        this.listaCiudades=respCiudades;
      })
      this.httpClient.get('http://localhost:8000/api/provincias/').subscribe((respProvincias:any)=>{
        this.listaProvincias=respProvincias;
      })
      this.httpClient.get('http://localhost:8000/api/nivelestudios/').subscribe((respNivel:any)=>{
        this.listaNivel=respNivel;
        //console.log(this.listaNivel)
      })
      this.httpClient.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe((resp2:any)=>{
      this.idUsuariologeado= resp2.idusuario;      
      this.addhtml();
      })
      
      
    });
    
    
    
  }
  formEmpresa: FormGroup = this.form.group({
    estado_idestado: 2
  })
  formEmpresa2: FormGroup = this.form.group({
    estado_idestado: 3
  })
  
 
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
              for(let c=0;c<this.listaCiudades.length;c++){
                if(this.listaCiudades[c].idciudad==this.listaSolicitudes[x].ciudad_idciudad){
                  oferta.ciudad = this.listaCiudades[c].nombreciudad
                 
                }
              } 
              for(let c=0;c<this.listaProvincias.length;c++){
                if(this.listaProvincias[c].idprovincia==this.listaSolicitudes[x].provincia_idprovincia){
                  oferta.provincia = this.listaProvincias[c].nombreprovincia
                  console.log(oferta.provincia)
                }
              } 
              oferta.aniosexperiencia = this.listaSolicitudes[x].aniosexperiencia
              oferta.rangoedad = this.listaSolicitudes[x].rangoedad
              oferta.experticia = this.listaSolicitudes[x].experticia
              oferta.sueldo = this.listaSolicitudes[x].sueldo
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
