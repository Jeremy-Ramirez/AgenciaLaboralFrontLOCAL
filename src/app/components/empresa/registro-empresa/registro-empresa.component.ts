import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CompileReflector } from '@angular/compiler';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  form: FormGroup;
  id='';
  usuarios:any[]=[];
  empresas:any[]=[];
  hide: boolean = true;
  comprobadorEmpresa = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correo: '',
      contrasenia: ''
    });
    this.getEmpresa()
    this.getRepresentante()

    
  }

  getRepresentante(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc;
    console.log(this.usuarios)
    })
  }

  getEmpresa(){
    this.http.get('http://localhost:8000/api/empresas/').subscribe((doc:any)=>{
      this.empresas=doc;
    console.log(this.empresas)
    })
  }

  submit(): void {
    
    for(let emp of this.empresas){
      
      //console.log(emp.correo)
      //console.log(this.form.getRawValue().correo)
      if(emp.correo==this.form.getRawValue().correo){
        this.http.post('http://localhost:8000/api/loginempresa/', this.form.getRawValue(), {
          withCredentials: true
        }).subscribe((res: any)=>{
          //console.log(res.jwt)
          //console.log(this.getDecodedAccessToken(res.jwt));
          this.id=this.getDecodedAccessToken(res.jwt).id;
          this.router.navigate(['/empresa/sesionEmpresa/perfilEmpresa'])
          
        },err => alert('USUARIO O CONTRASEÑA INCORRECTA'));
        this.comprobadorEmpresa=true;
      }
    }
   
    
    for(let rep of this.usuarios){
      //console.log("rep",rep.correo)
      //console.log("inicio",this.form.getRawValue().correo)
      if(rep.correo==this.form.getRawValue().correo){
        if(rep.rol_idrol==1){
          this.http.post('http://localhost:8000/api/loginusuario/', this.form.getRawValue(), {
          withCredentials: true
          }).subscribe((res: any)=>{
          //console.log(res.jwt)
          //console.log(this.getDecodedAccessToken(res.jwt));
          this.id=this.getDecodedAccessToken(res.jwt).id;
          this.router.navigate(['/representante/sesionRepresentante'])
          //console.log(res.id)
          },err => alert('USUARIO O CONTRASEÑA INCORRECTA'));  
        }
        
      }
      
    }

    if(this.comprobadorEmpresa==false){
      alert('USUARIO NO EXISTE');
    }
    
  }
  
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  show() {
    this.hide = !this.hide;
  }
}
