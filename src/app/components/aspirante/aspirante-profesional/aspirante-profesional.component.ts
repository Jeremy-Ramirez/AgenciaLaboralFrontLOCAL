import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesionesService } from '../../../servicios/profesiones.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-aspirante-profesional',
  templateUrl: './aspirante-profesional.component.html',
  styleUrls: ['./aspirante-profesional.component.css']
})
export class AspiranteProfesionalComponent implements OnInit {


  file: any;

  profesiones:any[]=[];
  id: any;
  message = '';
  constructor(private fb: FormBuilder,private _profesiones:ProfesionesService,private http:HttpClient, private rutaActiva: ActivatedRoute ) { }


 
  miFormulario: FormGroup= this.fb.group({
    
    numerohijos: ["", [Validators.required]],
    experiencialaboral: ["", [Validators.required]],
    campolaboral:["",[Validators.required]],
    experticia:["",[Validators.required]],
    videopresentacion:["",[Validators.required]],
    aniosexperiencia:["",[Validators.required]],
    fechanacimiento:["",[Validators.required, ]],
    posibilidadviajar:["",[Validators.required]],
    profesiones_idprofesiones:["",[Validators.required]],
    usuario_idusuario:null,
  })



 
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
   
    this._profesiones.getProfesiones().subscribe((resp:any)=>{
      this.profesiones=resp;
      console.log(this.profesiones)
    })

  }

  

  handleFileInput(event: Event){

    this.file=(<HTMLInputElement>event.target).files[0];
    console.log("archivo", this.file)

  
 }

  guardar(){

    let formData= new FormData();
    formData.append('numerohijos',this.miFormulario.controls['numerohijos'].value)
    formData.append('experiencialaboral',this.miFormulario.controls['experiencialaboral'].value)
    formData.append('campolaboral',this.miFormulario.controls['campolaboral'].value)
    formData.append('experticia',this.miFormulario.controls['experticia'].value)
    formData.append('aniosexperiencia',this.miFormulario.controls['aniosexperiencia'].value)
    formData.append('fechanacimiento',this.miFormulario.controls['fechanacimiento'].value)
    formData.append('videopresentacion',this.file)
    formData.append('posibilidadviajar',this.miFormulario.controls['posibilidadviajar'].value)
    formData.append('profesiones_idprofesiones',this.miFormulario.controls['profesiones_idprofesiones'].value)
    formData.append('usuario_idusuario',this.id)

    console.log(this.miFormulario.value);
    this.http.post('http://localhost:8000/api/aspirantes/', formData).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
    alert('DATOS PROFESIONALES GUARDADOS');
    this.miFormulario.reset();
    
  
  }
}
