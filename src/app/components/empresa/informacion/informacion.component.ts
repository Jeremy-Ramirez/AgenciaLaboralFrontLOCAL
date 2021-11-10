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
  tipoempresaDesc ='';
  ciudadDesc='';
  provinciaDesc='';
  sectorDesc='';
  ramaDesc ='';
  nombrecomercial ='';
  razonsocial ='';
  calleprincipal ='';
  callesecundaria ='';  
  mz ='';  
  villa ='';  
  referencia ='';
  telefonooficina ='';
  celular ='';
  correo ='';
  paginaweb ='';
  actDesc='';
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
  
  telCelularValue = '';
  public validadorDeTelCelular= true; 
  telOficinaValue = '';
  public validadorDeTelOficina= true; 
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
      this.nombrecomercial=resp.nombrecomercial
      this.razonsocial=resp.razonsocial
      this.calleprincipal=resp.calleprincipal
      this.callesecundaria=resp.callesecundaria
      this.mz=resp.mz
      this.villa=resp.villa      
      this.referencia=resp.referencia
      this.telefonooficina=resp.telefonooficina            
      this.celular=resp.celular
      this.correo=resp.correo
      this.paginaweb=resp.paginaweb
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
      this._tipoempresaService.getTipoempresas().subscribe((resp2:any)=>{
        this.tipoempresas=resp2
        console.log(resp2)
        for(let i=0;i<this.tipoempresas.length;i++){
          if(this.tipoempresas[i].idtipoempresa==resp.tipoempresa_idtipoempresa){
            this.tipoempresaDesc= this.tipoempresas[i].descripcion;
          }
        }
        console.log(this.tipoempresaDesc)
  
      });
      this._ramaactividadService.getRamaactividads().subscribe((resp2:any)=>{
        this.ramaactividads=resp2
        console.log(resp2)
        for(let i=0;i<this.ramaactividads.length;i++){
          if(this.ramaactividads[i].idramaactividad==resp.ramaactividad_idramaactividad){
            this.ramaDesc= this.ramaactividads[i].descripcion;
          }
        }
        console.log(this.ramaDesc)
  
      });
      this._actividadeconomicaService.getActividadeconomicas().subscribe((resp2:any)=>{
        this.actividadeconomicas=resp2
        console.log(resp2)
        for(let i=0;i<this.actividadeconomicas.length;i++){
          if(this.actividadeconomicas[i].idactividadeconomica==resp.actividadeconomica_idactividadeconomica){
            this.actDesc= this.actividadeconomicas[i].descripcion;
          }
        }
        console.log(this.actDesc)
  
      });
      
      this._ciudadService.getCiudades().subscribe((resp2:any)=>{
        this.ciudades=resp2
        //console.log(resp2)
        for(let i=0;i<this.ciudades.length;i++){
          if(this.ciudades[i].idciudad==resp.ciudad_idciudad){
            this.ciudadDesc= this.ciudades[i].nombreciudad;
          }
        }
        //console.log(this.ciudadDesc)
  
      });
      this._provinciaService.getProvincias().subscribe((resp2:any)=>{
        this.provincias=resp2
        //console.log(resp2)
        for(let i=0;i<this.provincias.length;i++){
          if(this.provincias[i].idprovincia==resp.provincia_idprovincia){
            this.provinciaDesc= this.provincias[i].nombreprovincia;
          }
        }
        //console.log(this.provinciaDesc)
  
      });
      this._sectorService.getSector().subscribe((resp2:any)=>{
        this.sectores=resp2
        //console.log(resp2)
        for(let i=0;i<this.sectores.length;i++){
          if(this.sectores[i].idsector==resp.sector_idsector){
            this.sectorDesc= this.sectores[i].descripcion;
          }
        }
        //console.log(this.sectorDesc)
  
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
    paginaweb: [""],
    ciudades: ["", Validators.required],
    celular:["",[Validators.required]],
    telefonooficina:["",[Validators.required]],
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

  validadorDeTelefonoOficina(){
    this.validadorDeTelOficina = true;
    //console.log(this.telOficinaValue.length)
    if (this.telOficinaValue.length==9){
      this.validadorDeTelOficina = true;
    }else {
      this.validadorDeTelOficina = false;
    }
    //console.log(this.validadorDeTelOficina)
  }

  validadorDeTelefonoCelular(){
    this.validadorDeTelCelular = true;
    let verificador = this.telCelularValue.substring(0, 2);
    if (this.telCelularValue.length==10 && verificador == '09'){
      this.validadorDeTelCelular = true;
    }else {
      this.validadorDeTelCelular = false;
    }
  }
}