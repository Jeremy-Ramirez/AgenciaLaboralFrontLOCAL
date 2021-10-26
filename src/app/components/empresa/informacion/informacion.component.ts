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

import {Emitters} from '../emitters/emitters';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})

export class InformacionComponent implements OnInit {
  tipopersonaDesc ='';
  tipodocumentoDesc ='';
  tipopersonas:any[]=[];
  tipodocumentos:any[]=[];
  tipoempresas:any[]=[];
  ramaactividads:any[]=[];
  actividadeconomicas:any[]=[];
  ciudades:any[]=[];
  provincias: any[]=[];
  sectores: any[]=[];
  empresas: any []=[];
  ruc_cedula='';
  idempresa = '';
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
    this._empresaService.loginEmpresa().subscribe((resp:any)=>{
      Emitters.authEmitter.emit(true);
      this.ruc_cedula=resp.ruc_cedula      
      this.idempresa=resp.idempresa
      this._tipodocumentoService.getTipodocumentos().subscribe((resp1:any)=>{
        this.tipodocumentos=resp1
        console.log(resp1)
        for(let i=0;i<this.tipodocumentos.length;i++){
          if(this.tipodocumentos[i].idtipodocumento==resp.tipodocumento_idtipodocumento){
            this.tipodocumentoDesc= this.tipodocumentos[i].descripcion;
          }
        }
        console.log(this.tipodocumentoDesc)
  
      });
      this._tipopersonaService.getTipopersonas().subscribe((resp2:any)=>{
        this.tipopersonas=resp2
        console.log(resp2)
        for(let i=0;i<this.tipopersonas.length;i++){
          if(this.tipopersonas[i].idtipopersona==resp.tipopersona_idtipopersona){
            this.tipopersonaDesc= this.tipopersonas[i].descripcion;
          }
        }
        console.log(this.tipopersonaDesc)
  
      });
      
      
      
      console.log(resp)  
      },
      err => {
        Emitters.authEmitter.emit(false);
      });
  }

  formEmpresa: FormGroup = this.form.group({
    actividadeconomicas: ["", [Validators.required]],
    ramaactividads: ["", [Validators.required]],
    sectores: ["", [Validators.required]],
    provincias: ["", [Validators.required]],
    tipoempresas: ["", [Validators.required]],
    razonsocial:["",[Validators.required]],
    nombrecomercial: ["", [Validators.required]],
    calleprincipal: ["", [Validators.required]],
    callesecundaria: ["", [Validators.required]],
    mz: ["", [Validators.required]],
    villa: ["", [Validators.required]],
    referencia: ["", [Validators.required]],
    paginaweb: ["", [Validators.required]],
    ciudades: ["", Validators.required],
    correoelectronico:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")]],
    celular:["",[Validators.required,Validators.minLength(10)]],
    telefonooficina:["",[Validators.required,Validators.minLength(10)]],
    contrasenia:["", [Validators.required]],
  })

  guardar(){
    if(this.formEmpresa.invalid) {
      return Object.values(this.formEmpresa.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
  
      console.log(this.formEmpresa.value);
      this.httpClient.put('https://agencialaboralproyecto.pythonanywhere.com/api/empresas/'+this.idempresa, this.formEmpresa.value).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )
    
    
    alert('Se han guardado los cambios')
  }
  
  campoEsValido( campo: string){
    return this.formEmpresa.controls[campo].errors  && this.formEmpresa.controls[campo].touched;
  }

  
}
