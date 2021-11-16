import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {EmpresaService} from '../../../servicios/empresa.service'
import {Emitters} from '../emitters/emitters';
@Component({
  selector: 'app-edit-pass',
  templateUrl: './edit-pass.component.html',
  styleUrls: ['./edit-pass.component.css']
})
export class EditPassComponent implements OnInit {
  
  ruc_cedula='';
  idempresa = '';
  hide: boolean = true;
  constructor( 
    private form: FormBuilder,
    private httpClient:HttpClient,    
    private _empresaService: EmpresaService,
    ) { 

    }

  ngOnInit(): void {
    this._empresaService.loginEmpresa().subscribe((resp:any)=>{
      Emitters.authEmitter.emit(true);
      this.ruc_cedula=resp.ruc_cedula      
      this.idempresa=resp.idempresa
      
      console.log(resp)  
      },
      err => {
        Emitters.authEmitter.emit(false);
      });
  }
    
  formEmpresa: FormGroup = this.form.group({
    correo:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")]],
    contrasenia:["", [Validators.required]],
  })
  guardar(){
    if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
  
      console.log(this.formEmpresa.value);
      this.httpClient.put('http://localhost:8000/api/empresas/'+this.idempresa, this.formEmpresa.value).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )
    
    
    alert('Se han guardado los cambios')
  }
  campoEsValido( campo: string){
    return this.formEmpresa.controls[campo].errors  && this.formEmpresa.controls[campo].touched;
  }
  show() {
    this.hide = !this.hide;
  }
  
}
