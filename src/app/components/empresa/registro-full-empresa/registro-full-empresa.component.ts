import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TipodocumentoService} from '../../../servicios/tipodocumento.service'
import {TipopersonaService} from '../../../servicios/tipopersona.service'
import {TipoempresaService} from '../../../servicios/tipoempresa.service'
import {RamaactividadService} from '../../../servicios/ramaactividad.service'
import {ActividadeconomicaService} from '../../../servicios/actividadeconomica.service'
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'
import {SectorService} from '../../../servicios/sector.service'
import {EmpresaService} from '../../../servicios/empresa.service'
import {throwError} from 'rxjs';

@Component({
  selector: 'app-registro-full-empresa',
  templateUrl: './registro-full-empresa.component.html',
  styleUrls: ['./registro-full-empresa.component.css']
})
export class RegistroFullEmpresaComponent implements OnInit {
  tipopersonas:any[]=[]; 
  tipodocumentos:any[]=[];
  tipoempresas:any[]=[];
  ramaactividads:any[]=[];
  actividadeconomicas:any[]=[];
  ciudades:any[]=[];
  provincias: any[]=[];
  sectores: any[]=[];
  empresas: any []=[];
  new_empresa: any []=[];
  hide: boolean = true;

  constructor(
    private _tipodocumentoService: TipodocumentoService,
    private _tipopersonaService: TipopersonaService,
    private _tipoempresaService: TipoempresaService,
    private _ramaactividadService: RamaactividadService,
    private _actividadeconomicaService: ActividadeconomicaService,
    private _ciudadService: CiudadService,
    private _provinciaService: ProvinciaService,
    private _sectorService: SectorService,
    private _empresaService: EmpresaService,
    private form: FormBuilder,
    private httpClient:HttpClient
    ) { 
  }
  
  ngOnInit() {
    this._tipodocumentoService.getTipodocumentos().subscribe((resp:any)=>{
      this.tipodocumentos=resp
      console.log(resp)

    });
    this._tipopersonaService.getTipopersonas().subscribe((resp:any)=>{
      this.tipopersonas=resp
      console.log(resp)

    });
    this._tipoempresaService.getTipoempresas().subscribe((resp:any)=>{
      this.tipoempresas=resp
      console.log(resp)

    });
    this._ramaactividadService.getRamaactividads().subscribe((resp:any)=>{
      this.ramaactividads=resp
      console.log(resp)

    });
    this._actividadeconomicaService.getActividadeconomicas().subscribe((resp:any)=>{
      this.actividadeconomicas=resp
      console.log(resp)

    });
    this._ciudadService.getCiudades().subscribe((resp:any)=>{
      this.ciudades=resp
      console.log(resp)

    });
    this._provinciaService.getProvincias().subscribe((resp:any)=>{
      this.provincias=resp
      console.log(resp)

    });
    this._sectorService.getSector().subscribe((resp:any)=>{
      this.sectores=resp
      console.log(resp)

    });
    
  }

  formEmpresa: FormGroup = this.form.group({
    tipodocumento_idtipodocumento: ["", [Validators.required]],
    actividadeconomica_idactividadeconomica: ["",[Validators.required]],
    ramaactividad_idramaactividad: ["",[Validators.required]],
    sector_idsector: ["",[Validators.required]],
    provincia_idprovincia: ["",[Validators.required]],
    tipoempresa_idtipoempresa: ["",[Validators.required]],
    tipopersona_idtipopersona: ["",[Validators.required]],
    ruc_cedula:["", [Validators.required, Validators.minLength(10)]],
    razonsocial:["",[Validators.required]],
    nombrecomercial: ["", [Validators.required]],
    calleprincipal: ["", [Validators.required]],
    callesecundaria: ["", [Validators.required]],
    mz: ["", [Validators.required]],
    villa: ["", [Validators.required]],
    referencia: ["", [Validators.required]],
    paginaweb: [""],
    ciudad_idciudad: ["",[Validators.required]],
    correoelectronico:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")]],
    celular:["",[Validators.required,Validators.pattern("^[0-9-+]{9,10}$"),Validators.maxLength(10)]],
    telefonooficina:["",[Validators.required,Validators.maxLength(9)]],
    contrasenia:["", [Validators.required]],
  })

  crear(){
    if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
  
      console.log(this.formEmpresa.value);
      this.httpClient.post('http://localhost:8000/api/empresas/', this.formEmpresa.value).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )
    
    
    alert('USUARIO CREADO')
    window.location.href='/empresa/registroEmpresa';
  }
  
  campoEsValido( campo: string){
    return this.formEmpresa.controls[campo].errors  && this.formEmpresa.controls[campo].touched;
  }
  show() {
    this.hide = !this.hide;
  }
  
}
