import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Emitters } from '../emitters/emitters';
@Component({
  selector: 'app-registro-representante',
  templateUrl: './registro-representante.component.html',
  styleUrls: ['./registro-representante.component.css']
})
export class RegistroRepresentanteComponent implements OnInit {

  public validador=true;


  tipoDocumento:any[]=[];
  usuarios:any[]=[];
  correo:any='';
  id:any;
  idFinal1:any;
  seleccionado:string;
  seleccionuser:string;
  numUsuario: number=0;
  hide: boolean = true;
  message = '';

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
  
  campoEsValido(campo: string){
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
    formData.append("empresa_idempresa",this.id);
    formData.append("usuario_idusuario",idFinal)
    this.http.post('http://localhost:8000/api/representantes/', formData).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
      },3000)

    
    }, 3000);
    
    alert('USUARIO CREADO')
    //this.miFormulario.reset();
  }

  public register() {
    const user = this.miFormulario.value;
    console.log(user);
  }
  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/

    this.http.get('http://localhost:8000/api/userempresa/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idempresa}`;
        this.id=res.idempresa
        console.log(this.id)
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );

    

    //this.getUsuarios();
  }

  show() {
    this.hide = !this.hide;
  }
  validadorDeCedula() {
    let cedulaCorrecta = false;
    console.log("entró al validador")
    let cedula=this.miFormulario.controls['nodocumento'].value
    console.log(cedula.length)
    if (cedula.length == 10)
    {   
        console.log("igual a 10")
        let tercerDigito = parseInt(cedula.substring(2, 3));
        if (tercerDigito < 6) {
          console.log("menor a 6")
        
            // El ultimo digito se lo considera dígito verificador
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificador = parseInt(cedula.substring(9, 10));
            let suma:number = 0;
            let digito:number = 0;
            for (let i = 0; i < (cedula.length - 1); i++) {
                digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
                suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
            }
            
            suma= Math.round(suma);
          
          //  console.log(verificador);
          //  console.log(suma);
          //  console.log(digito);
  
            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                cedulaCorrecta = true;
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
                cedulaCorrecta = true;
            } else {
                cedulaCorrecta = false;
            }
        } else {
            cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
  
  
  this.validador= cedulaCorrecta;
  
    
  }


}