import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-sugerencias-comentarios',
  templateUrl: './sugerencias-comentarios.component.html',
  styleUrls: ['./sugerencias-comentarios.component.css']
})
export class SugerenciasComentariosComponent implements OnInit {

  sugerencias:any[]=[];
  correo:any='';
  id:'';
  file: any;
  message = '';


  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/

    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

  miFormulario: FormGroup = this.fb.group({
    titulo: ["", Validators.required],
    descripcion: ["", Validators.required],
    usuario_idusuario: 1,
    imagen: ["", Validators.required],
    

  })

  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors
    && this.miFormulario.controls[campo].touched;
    
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private rutaActiva: ActivatedRoute) {
   }
   
   handleFileInput(event: Event){

      this.file=(<HTMLInputElement>event.target).files[0];
      console.log("archivo", this.file)

    
   }
  createSugerencia(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.controls['imagen'].value)
    let headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    let options = {headers: headers};
    let formData = new FormData();
    formData.append('titulo',this.miFormulario.controls['titulo'].value)
    formData.append('descripcion',this.miFormulario.controls['descripcion'].value)
    formData.append('imagen',this.file)
    formData.append('usuario_idusuario',this.id)
    
    this.http.post('http://localhost:8000/api/sugerencias/', formData,options).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )
    alert('SUGERENCIA ENVIADA')
    
    this.miFormulario.reset();
    
    

  }

  

}

