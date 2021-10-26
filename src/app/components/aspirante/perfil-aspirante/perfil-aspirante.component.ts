import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Emitters } from '../emitters/emitters';
@Component({
  selector: 'app-perfil-aspirante',
  templateUrl: './perfil-aspirante.component.html',
  styleUrls: ['./perfil-aspirante.component.css']
})
export class PerfilAspiranteComponent implements OnInit {
  //aspirantes:any[]=[];
  file:any;
  id='';
  message = '';
  usuarioActual: any;
  constructor(private http:HttpClient,private fb: FormBuilder,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        this.usuarioActual=res;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );

    

    this.getAspirantes();
    this.getUsuarios();
    this.getAspirantes()
    this.getArchivos()
  }

  aspirantes:any[]=[];
  usuarios:any[]=[];
  archivos:any[]=[];

  miFormulario: FormGroup= this.fb.group({
    
    numerohijos: ["", [Validators.required]],
    experiencialaboral: ["", [Validators.required]],
    campolaboral:["",[Validators.required]],
    experticia:["",[Validators.required]],
    videopresentacion:["",[Validators.required]],
    aniosexperiencia:["",[Validators.required]],
    fechanacimiento:["",[Validators.required]],
    posibilidadviajar:["",[Validators.required]],
    profesiones_idprofesiones:["",[Validators.required]],
    usuario_idusuario:this.id,
  })

  getAspirantes(){
    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/aspirantes/').subscribe((resp:any)=>{
      this.aspirantes=resp;
      console.log(this.aspirantes)
    })
  }

  getUsuarios(){
    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/usuarios/').subscribe((resp:any)=>{
      this.usuarios=resp;
      console.log(this.usuarios)
    })
  }

  getArchivos(){
    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/archivosaspirante/').subscribe((resp:any)=>{
      this.archivos=resp;
      console.log(this.archivos)
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
