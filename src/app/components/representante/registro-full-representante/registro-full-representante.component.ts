import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registro-full-representante',
  templateUrl: './registro-full-representante.component.html',
  styleUrls: ['./registro-full-representante.component.css']
})
export class RegistroFullRepresentanteComponent implements OnInit {

  genero:any[]=[];
  tipoDocumento:any[]=[];
  provincia:any[]=[];
  ciudad:any[]=[];
  usuarios:any[]=[];
  correo:any='';
  id:'';

  seleccionado:string;
  seleccionuser:string;

  

  miFormulario: FormGroup = this.fb.group({
    nombreusuario: ["", Validators.required],
    contrasenia:["", [Validators.required]],
    tipodocumento_idtipodocumento: ["", Validators.required],
    nodocumento:["",[Validators.required, Validators.minLength(10)]],
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    correo:["", [Validators.required, Validators.email]],
    telefono: null,
    direccion: null,
    estadocuenta: "cad",
    genero_idgenero:["", [Validators.required]],
    rol_idrol: 1,
    estadocivil_idestadocivil: 1,
    provincia_idprovincia:["", [Validators.required]],
    ciudad_idciudad:["", [Validators.required]],
    //confirmacion:["", [Validators.required]],

  })

  constructor(private fb: FormBuilder, private http: HttpClient, private rutaActiva: ActivatedRoute) {
    //this.getUsuarios();
    this.getGenero();
    this.getTipodocumento();
    this.getProvincias();
    this.getCiudades();
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

  getGenero(){
    this.http.get('http://localhost:8000/api/genero/').subscribe((resp:any)=>{
      this.genero=resp
      //console.log(resp)
     console.log(this.genero)

    },
    err => console.error(err),
    )
  }

  getProvincias(){
    this.http.get('http://localhost:8000/api/provincias/').subscribe((resp:any)=>{
    this.provincia=resp
    console.log(this.provincia)
    })
  }

  getCiudades(){
    this.http.get('http://localhost:8000/api/ciudades/').subscribe((resp:any)=>{
    this.ciudad=resp
    console.log(this.ciudad)
    })
  }
  /*getUsuarios(){
    this.http.get('http://127.0.0.1:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc
      this.usuarios.forEach(element => {
        if(element.id===this.id){
            this.correo=element.correo;
        }
      });
    })
  }*/

  createUsuario(){
    console.log(this.miFormulario.value);
    this.http.post('http://localhost:8000/api/usuarios/', this.miFormulario.value).subscribe(
      resp => console.log(resp),
      err => console.log(err)
    )
  }

  updateUsuario() {
    //this.correo=this.miFormulario.get("correo").value;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.put<any>("http://localhost:8000/api/usuarios/"+this.id,this.miFormulario.value,{headers: headers}).subscribe(
      resp => console.log(resp),
      err => console.log(err)
        );
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
