import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro-full-aspirante',
  templateUrl: './registro-full-aspirante.component.html',
  styleUrls: ['./registro-full-aspirante.component.css']
})
export class RegistroFullAspiranteComponent implements OnInit {

  hide: boolean = true;
  public validador= true; 

  generos:any[]=[];
  usuarios:any[]=[];

  provincias:any[]=[];
  ciudades:any[]=[];
  tipoDocumento:any[]=[];

  seleccionado:string;
  seleccionuser:string;

  miFormulario: FormGroup = this.fb.group({
    
    nombreusuario: ["", [Validators.required]],
    contrasenia:["", [Validators.required, Validators.maxLength(10)]],
    tipodocumento_idtipodocumento: ["", Validators.required],
    nodocumento:["",[Validators.required]],
    nombre: ["", [Validators.required]],
    apellido: ["", [Validators.required]],
    correo:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")]],
    telefono:["",[Validators.required,Validators.pattern("^[0-9-+]{9,10}$"),Validators.maxLength(10)]],
    direccion:["",[Validators.required]],
    estadoCuenta:null,
    ciudad_idciudad:["", [Validators.required]],
    estadocivil_idestadocivil: 1,
    genero_idgenero:["", [Validators.required]],
    provincia_idprovincia:["", [Validators.required]],
    rol_idrol: 2,
   
    
    
    
    
  })

  constructor(private http:HttpClient,private fb: FormBuilder) { 

    this.getGenero();
    //this.getTipodocumento();
    this.getProvincias();
    this.getCiudades();
    this.getTipodocumento();
  }

  ngOnInit(): void {
  }

get tipoDocumentoNoValido(){
  return this.miFormulario.get('tipodocumento_idtipodocumento').invalid && this.miFormulario.get('tipodocumento_idtipodocumento').touched
}
get usuarioNoValido(){
  return this.miFormulario.get('nombreusuario').invalid && this.miFormulario.get('nombreusuario').touched
}

get telefonoNoValido(){
  return this.miFormulario.get('telefono').invalid && this.miFormulario.get('telefono').touched
}

get direccionNoValido(){
  return this.miFormulario.get('direccion').invalid && this.miFormulario.get('direccion').touched
}






get numDocumentoNoValido(){
  return this.miFormulario.get('nodocumento').invalid && this.miFormulario.get('nodocumento').touched
}

get nombresNoValido(){
  return this.miFormulario.get('nombre').invalid && this.miFormulario.get('nombre').touched
}

get apellidosNoValido(){
  return this.miFormulario.get('apellido').invalid && this.miFormulario.get('apellido').touched
}

get provinciaNoValido(){
  return this.miFormulario.get('provincia_idprovincia').invalid && this.miFormulario.get('provincia_idprovincia').touched
}

get ciudadNoValido(){
  return this.miFormulario.get('ciudad_idciudad').invalid && this.miFormulario.get('ciudad_idciudad').touched
}

get correoNoValido(){
  return this.miFormulario.get('correo').invalid && this.miFormulario.get('correo').touched
}


get contraseniaNoValido(){
  return this.miFormulario.get('contrasenia').invalid && this.miFormulario.get('contrasenia').touched
}

get confirmacionNoValido(){
  return this.miFormulario.get('confirmacion').invalid && this.miFormulario.get('confirmacion').touched
}

get generoNoValido(){
  return this.miFormulario.get('genero_idgenero').invalid && this.miFormulario.get('genero_idgenero').touched
}


  getTipodocumento(){
    this.http.get('http://localhost:8000/api/tipodocumento/').subscribe((doc:any)=>{
      this.tipoDocumento=doc;
    console.log(this.tipoDocumento)
    })
  }





  getGenero(){
    this.http.get('http://localhost:8000/api/genero/').subscribe((resp:any)=>{
      this.generos=resp
     
     console.log(this.generos)

    })
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
    console.log(this.ciudades)
    })
  }

  getUsuarios(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc;
    console.log("getusuarios",this.usuarios)
    })
  }


  
  guardar(){

    
    if(this.miFormulario.invalid) {
      return Object.values(this.miFormulario.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
  
      console.log(this.miFormulario.value);
      this.http.post('http://localhost:8000/api/usuarios/', this.miFormulario.value).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )
      

      setTimeout(()=>{ 
        this.getUsuarios();
        setTimeout(()=>{
          let idFinal=this.usuarios.pop().idusuario;
      console.log(idFinal)
      
      console.log(idFinal)
      let formData = new FormData();


   


      formData.append("usuario_idusuario",idFinal)
      this.http.post('http://localhost:8000/api/aspirantes/', formData).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )
        },3000)
  
      
      }, 3000);

      
    setTimeout(() => {
      alert('USUARIO CREADO')
      window.location.href='/aspirante/registroAspirante';
    }, 6000);
    
   

  }




  mostrarPassword(){
   
    
    const tipo = <HTMLInputElement>document.getElementById('password');
    //console.log(tipo.type)

    if(tipo.type == 'password'){
      tipo.type= 'text';
    }else{
      tipo.type='password';
    }

  }

  show() {
    this.hide = !this.hide;
  }


  //esta es la variable de validación
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
