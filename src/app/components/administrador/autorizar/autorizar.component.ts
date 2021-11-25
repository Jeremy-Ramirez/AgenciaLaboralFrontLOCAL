import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaView } from '../clases/empresa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmpresaService} from '../../../servicios/empresa.service'
@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent implements OnInit {
  empresas:any[]=[];  
  listaEmpresas: Array<EmpresaView>= [];
  constructor(
    private _empresaService: EmpresaService,
    private form: FormBuilder,
    private httpClient:HttpClient
  ) { }
  
  ngOnInit(): void {
    this._empresaService.getEmpresas().subscribe((resp:any)=>{
      this.empresas=resp
      this.addhtml();
      console.log(this.listaEmpresas)
      console.log(resp)

    });
  }
  formEmpresa: FormGroup = this.form.group({
    estado_idestado: 4 //id estado -autorizado //por ahora se mostrarán todas las empresas, las que hayan enviado puede ser con estado pendiente
  })
  formEmpresa2: FormGroup = this.form.group({
    estado_idestado: 5 //id estado -no autorizado
  })
  
  addhtml(){
    for(let i=0;i<this.empresas.length;i++){
      var empresa = new EmpresaView();
      empresa.id = this.empresas[i].idempresa;
      empresa.ruc_cedula = this.empresas[i].ruc_cedula
      empresa.nombrecomercial = this.empresas[i].nombrecomercial
      empresa.razonsocial = this.empresas[i].razonsocial
      empresa.estado = this.empresas[i].estado_idestado
      console.log(typeof (empresa.id))
      this.listaEmpresas.push(empresa);
    }     
  }
  autorizar(idempresa) {
    if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }  
    //console.log(this.formEmpresa.value);
    this.httpClient.put('http://localhost:8000/api/empresas/'+idempresa, this.formEmpresa.value).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
    alert('EMPRESA AUTORIZADA')    
    window.location.reload()

  }
  noautorizar(idempresa) {
    
    if(this.formEmpresa2.invalid) {
      return Object.values(this.formEmpresa2.controls).forEach(control=>{
        control.markAsTouched();
      })
    }  
    //console.log(this.formEmpresa2.value);
    this.httpClient.put('http://localhost:8000/api/empresas/'+idempresa, this.formEmpresa2.value).subscribe(
      resp => console.log(resp),
      err => console.log(err)

    )
    alert('AUTORIZACIÓN NEGADA')
    
    window.location.reload()
  }
    
}
