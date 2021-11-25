import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})


/*
@Injectable({
  providedIn: 'root'
})*/
export class RegistroAdministradorComponent implements OnInit {
  id='';
  usuarioActual:any;
  miFormulario: FormGroup;
  hide: boolean = true;
  administradores: any[]=[];
  public correov= false;
  public passwordc=false;



  httpOptions={
    headers: new HttpHeaders({
      'Content-Type' : 'Application/json'
    })
  };
  constructor(private fb: FormBuilder, private http: HttpClient, private rutaActiva: ActivatedRoute, private router: Router){ }
  
  

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      correo: ["", Validators.required],
      contrasenia:["", [Validators.required]],
      
  
    })
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/
    this.getAspirante()
  }

  /*getUsuarioActual(){

    this.http.get('http://127.0.0.1:8000/api/userusuario/').subscribe((doc:any)=>{
      this.usuarioActual=JSON.stringify(doc);
      this.id=this.usuarioActual.idusuario;
      console.log("USERR",this.usuarioActual)
    })
  }*/

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  getAspirante(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.administradores=doc;
    //console.log(this.administradores)
    })
  }

  login(){
    console.log(this.miFormulario.value);

    for(let asp of this.administradores){
      if(asp.correo==this.miFormulario.getRawValue().correo){
        if(asp.rol_idrol==3){
          this.http.post('http://localhost:8000/api/loginusuario/', this.miFormulario.getRawValue(),
          {
            withCredentials: true
           }).subscribe(
           (res: any)=>{
             console.log(res.jwt)
             console.log(this.getDecodedAccessToken(res.jwt));
             this.id=this.getDecodedAccessToken(res.jwt).id;
             console.log("admin entra")
             ///${this.id}
               //this.getUsuarioActual()
             this.router.navigate( [`/administrador/sesionAdministrador/perfilAdministrador`]);
             //localStorage.setItem('auth_token', res.token);
     
             
           },
           (err:any)=>{
            console.log(err)
          
            if(err.error.correo=='User not found!'){

              this.correov=true;
              //alert("Usuario no existe")
            }
            else{
              console.log(err)
              this.passwordc=true;
              //alert("Contraseña incorrecta")
            }
              
            
            
            
  
  
  
  
          }
          )
        }
      }
    }
    
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  show() {
    this.hide = !this.hide;
  }

}