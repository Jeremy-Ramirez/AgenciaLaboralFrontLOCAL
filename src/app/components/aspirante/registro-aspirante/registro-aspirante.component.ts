import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registro-aspirante',
  templateUrl: './registro-aspirante.component.html',
  styleUrls: ['./registro-aspirante.component.css']
})


/*
@Injectable({
  providedIn: 'root'
})*/
export class RegistroAspiranteComponent implements OnInit {
  id='';
  usuarioActual:any;
  miFormulario: FormGroup;
  hide: boolean = true;
  aspirantes: any[]=[];
  public correov= false;
  public passwordc=false;

  loading: boolean;



  httpOptions={
    headers: new HttpHeaders({
      'Content-Type' : 'Application/json'
    })
  };

  
  constructor(private fb: FormBuilder, private http: HttpClient, private rutaActiva: ActivatedRoute, private router: Router){ 
    this.loading=false;
  }

  

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
      this.aspirantes=doc;
    //console.log(this.aspirantes)
    })
  }

  login(){
    console.log(this.miFormulario.value);

    for(let asp of this.aspirantes){
      if(asp.correo==this.miFormulario.getRawValue().correo){
        if(asp.rol_idrol==2){
          this.http.post('http://localhost:8000/api/loginusuario/', this.miFormulario.getRawValue(),
          {
            withCredentials: true
           }).subscribe(
            
           (res: any)=>{
            this.loading=true;
             console.log(res.jwt)
             console.log(this.getDecodedAccessToken(res.jwt));
             this.id=this.getDecodedAccessToken(res.jwt).id;
              this.loading=true;
             ///${this.id}
               //this.getUsuarioActual()
             this.router.navigate( [`/aspirante/sesionAspirante/perfilAspirante`]);
             //localStorage.setItem('auth_token', res.token);
     
             
           },
           (err:any)=>{
            console.log(err)
          
            if(err.correo=='User not found!'){
              this.loading=true;
              this.correov=true;
            }
            else{
              console.log(err)
              this.passwordc=true;
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