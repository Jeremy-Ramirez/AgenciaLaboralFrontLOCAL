import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css']
})
export class RegistroEmpresaComponent implements OnInit {
  form: FormGroup;
  id='';
  hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      correoelectronico: '',
      contrasenia: ''
    });
  }
  submit(): void {
    this.http.post('http://localhost:8000/api/loginempresa/', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe((res: any)=>{
      console.log(res.jwt)
      console.log(this.getDecodedAccessToken(res.jwt));
      this.id=this.getDecodedAccessToken(res.jwt).id;
      this.router.navigate(['/empresa/sesionEmpresa/perfilEmpresa'])
      console.log(res.id)
    },err => alert('USUARIO O CONTRASEÑA INCORRECTA'));
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
