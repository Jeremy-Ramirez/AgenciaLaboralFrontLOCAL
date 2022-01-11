import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vista-perfil-aspirante',
  templateUrl: './vista-perfil-aspirante.component.html',
  styleUrls: ['./vista-perfil-aspirante.component.css']
})
export class VistaPerfilAspiranteComponent implements OnInit, OnDestroy {
  @Input() idAspirante: any;
  //aspirantes:any[]=[];
  file:any;
  documento: any;
  aspirantes:any[]=[];
  usuarios:any[]=[];
  usuariosId:any;
  aspiranteId:any;
  categoria:any[]=[];
  profesiones:any[]=[];
  archivos:any[]=[];
  profesiondesc='';
  id: any;
  archivoValido:boolean =true;
  suscription: Subscription; 

  loading: boolean;
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.date.getFullYear();


  constructor(
    private http:HttpClient,
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute,
    public dialogRef: MatDialogRef<VistaPerfilAspiranteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {aspiranteIndividual: any, usuarioIndividual:any},
    
    ) {
    //this.idAspirante=3;
    console.log("hereda",this.data.aspiranteIndividual)
    this.loading=false;


   }

  cancelar() {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/
    this.id=this.data.usuarioIndividual.idusuario
    console.log("ID DE LA DATAAAAA",this.id)
    this.getProfesiones()
    this.getAspirantes();
    this.getUsuarios();
    this.getUsuariosId();
    this.getAspiranteporId();

    
  }
  ngOnDestroy():void{
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }


  getAspiranteporId(){
    for(let asp of this.aspirantes){
      if(this.usuariosId.idusuario==asp.usuario_idusuario){
        this.aspiranteId=asp;
        for(let profesion of this.profesiones){
          if(asp.profesiones_idprofesiones==profesion.idprofesiones){
            this.profesiondesc=profesion.profesion
          }

        }
        console.log("ASPIRANTEID")
        console.log("ASPIRANTEID", this.aspiranteId)

      }

    }
  }





  getAspirantes(){
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((resp:any)=>{
      this.aspirantes=resp;
      console.log(this.aspirantes)
    })
  }

  getUsuarios(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((resp:any)=>{
      this.usuarios=resp;
      console.log(this.usuarios)
    })
  }

  getUsuariosId(){
    this.http.get('http://localhost:8000/api/usuarios/'+ this.id).subscribe((resp:any)=>{
      this.usuariosId=resp;
      console.log(this.usuariosId)
      this.getAspiranteporId();
    })
  }

  
  getProfesiones(){
    this.http.get('http://localhost:8000/api/profesiones/').subscribe((resp:any)=>{
      this.profesiones=resp;
      console.log(this.profesiones)
    })
  }

  /*getAspirantes(){
    this.http.get('http://127.0.0.1:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
        console.log(this.aspirantes)
        this.aspirantes.forEach(element => {
          if(element.idaspirante=='16'){
            this.file=element.videopresentacion;
          }
        });

    })
  }*/

  




 

  


 

 

  



  

 


  


}
