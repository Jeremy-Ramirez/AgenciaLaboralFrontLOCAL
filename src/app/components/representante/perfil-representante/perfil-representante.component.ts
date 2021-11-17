import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-perfil-representante',
  templateUrl: './perfil-representante.component.html',
  styleUrls: ['./perfil-representante.component.css']
})
export class PerfilRepresentanteComponent implements OnInit {
  id='';
  message = '';
  usuarioActual: any;
  tipoDocumento: any[]=[];
  generos:any[]=[];
  provincias:any[]=[];
  ciudades:any[]=[];
  usuarios:any[]=[];
  estadosCiviles: any[]=[];
  nombredoc='';
  provincia='';
  ciudad='';
  genero='';
  estadoCivil='';
  constructor(private http:HttpClient,private fb: FormBuilder,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {


    this.getGenero();
    this.getTipodocumento();
    this.getProvincias();
    this.getCiudades();
    this.getEstadoCivil();

    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        this.usuarioActual=res;
        for( let doc of this.tipoDocumento){
          console.log(doc.idtipodocumento)
          if(doc.idtipodocumento == this.usuarioActual.tipodocumento_idtipodocumento)
            this.nombredoc=  doc.descripcion;
        }
        for(let provincia of this.provincias){
          console.log("hola")
          if(provincia.idprovincia == this.usuarioActual.provincia_idprovincia){
            this.provincia= provincia.nombreprovincia;

          }
        }
        for(let ciudad of this.ciudades){
          console.log("hola")
          if(ciudad.idciudad == this.usuarioActual.ciudad_idciudad){
            this.ciudad= ciudad.nombreciudad;

          }
        }
        for(let genero of this.generos){
          console.log("hola")
          if(genero.idgenero == this.usuarioActual.genero_idgenero){
            console.log("genero")
            this.genero= genero.genero;

          }
        }

        for(let estadoCivil of this.estadosCiviles){
          console.log(estadoCivil.estadocivil)
          if(estadoCivil.idestadocivil == this.usuarioActual.estadocivil_idestadocivil){
            console.log("a")
            this.estadoCivil= estadoCivil.estadocivil;
            console.log(this.estadoCivil)

          }
        }





        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

  getTipodocumento(){
    this.http.get('http://localhost:8000/api/tipodocumento/').subscribe((doc:any)=>{
      this.tipoDocumento=doc;
      console.log(this.tipoDocumento)
      
    })
    
  }

  getEstadoCivil(){
    this.http.get('http://localhost:8000/api/estadocivils/').subscribe((doc:any)=>{
      this.estadosCiviles=doc;
      console.log(this.estadosCiviles)
    })
  }

  getGenero(){
    this.http.get('http://localhost:8000/api/genero/').subscribe((resp:any)=>{
      this.generos=resp
      //console.log(resp)
     console.log(this.generos)

    },
    err => console.error(err),
    )
  }

  getProvincias(){
    this.http.get('http://localhost:8000/api/provincias/').subscribe((resp:any)=>{
    this.provincias=resp
    console.log(this.provincias)
    })
  }

  getCiudades(){
    this.http.get('http://localhost:8000/api/ciudades/').subscribe((resp:any)=>{
    this.ciudades=resp
    console.log(this.ciudad)
    })
  }

}