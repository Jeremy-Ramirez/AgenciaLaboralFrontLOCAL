import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-registro-representante',
  templateUrl: './registro-representante.component.html',
  styleUrls: ['./registro-representante.component.css']
})
export class RegistroRepresentanteComponent implements OnInit {



  tipoDocumento:any[]=[];
  usuarios:any[]=[];
  correo:any='';
  id:'';
  idFinal1:any;
  seleccionado:string;
  seleccionuser:string;
  numUsuario: number=0;
  

  miFormulario: FormGroup = this.fb.group({
    nombreusuario: null,
    contrasenia:["", [Validators.required]],
    tipodocumento_idtipodocumento: ["", Validators.required],
    nodocumento:["",[Validators.required, Validators.minLength(10)]],
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    correo:["", [Validators.required, Validators.email]],
    telefono: null,
    direccion: null,
    estadocuenta: null,
    genero_idgenero:null,
    rol_idrol: 1,
    estadocivil_idestadocivil: null,
    provincia_idprovincia:null,
    ciudad_idciudad:null,
    //confirmacion:["", [Validators.required]],

  })

  constructor(private fb: FormBuilder, private http: HttpClient, private rutaActiva: ActivatedRoute) {
    this.getTipodocumento();
    
  }
  
  campoEsValido( campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }


  getTipodocumento(){
    this.http.get('http://localhost:8000/api/tipodocumento/').subscribe((doc:any)=>{
      this.tipoDocumento=doc;
    console.log(this.tipoDocumento)
    })
  }

  getUsuarios(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc;
    console.log("getusuarios",this.usuarios)
    })
  }

  createUsuario(){
    this.numUsuario= this.numUsuario+1;

    console.log(this.miFormulario.value);
    this.http.post('http://localhost:8000/api/usuarios/', this.miFormulario.value).subscribe(
      resp => {
        this.correo=Object.values(resp)[6]},
      err => console.log(err),
      


    )
    setTimeout(()=>{ 
      this.getUsuarios();
      setTimeout(()=>{
        let idFinal=this.usuarios.pop().idusuario;
    console.log(idFinal)
    
    console.log(idFinal)
    let formData = new FormData();
    formData.append("empresa_idempresa", "1");
    formData.append("usuario_idusuario",idFinal)
    this.http.post('http://localhost:8000/api/representantes/', formData).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
      },3000)

    
    }, 3000);
    
    alert('USUARIO CREADO')
    
  }

  public register() {
    const user = this.miFormulario.value;
    console.log(user);
  }
  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )

    //this.getUsuarios();
  }


}