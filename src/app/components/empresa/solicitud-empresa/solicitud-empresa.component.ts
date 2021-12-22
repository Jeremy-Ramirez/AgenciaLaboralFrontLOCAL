import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Emitters} from '../emitters/emitters';
import {EmpresaService} from '../../../servicios/empresa.service'
@Component({
  selector: 'app-solicitud-empresa',
  templateUrl: './solicitud-empresa.component.html',
  styleUrls: ['./solicitud-empresa.component.css']
})
export class SolicitudEmpresaComponent implements OnInit {
  idempresa = '';
  constructor( 
    private form: FormBuilder,
    private httpClient:HttpClient,    
    private _empresaService: EmpresaService,
    ) { 

    }

  ngOnInit(): void {
    this._empresaService.loginEmpresa().subscribe((resp:any)=>{
      Emitters.authEmitter.emit(true);     
      this.idempresa=resp.idempresa
      
      console.log(resp)  
      },
      err => {
        Emitters.authEmitter.emit(false);
      });
  }
  
  formEmpresa: FormGroup = this.form.group({
    estado_idestado: 13 //id estado 13 en mi base 6 en anywhere-pendiente 
  })
  
  solicitar(){
    if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
  
    if (confirm('Está seguro que desea enviar esta solicitud?')) {
      this.httpClient.put('http://localhost:8000/api/empresas/'+this.idempresa, this.formEmpresa.value).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
      console.log('Thing was saved to the database.');
    } else {
      console.log('Thing was not saved to the database.');
    }
    window.location.reload()

  }
}
