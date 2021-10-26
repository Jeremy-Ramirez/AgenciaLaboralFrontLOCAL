import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Emitters} from '../emitters/emitters';

import {EmpresaService} from '../../../servicios/empresa.service'
@Component({
  selector: 'app-sesion-empresa',
  templateUrl: './sesion-empresa.component.html',
  styleUrls: ['./sesion-empresa.component.css']
})
export class SesionEmpresaComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private _empresaService: EmpresaService) { }

  ngOnInit(): void {
    this._empresaService.loginEmpresa().subscribe((resp:any)=>{
      Emitters.authEmitter.emit(true);  
      },
      err => {
        Emitters.authEmitter.emit(false);
      });
    
  }

}
