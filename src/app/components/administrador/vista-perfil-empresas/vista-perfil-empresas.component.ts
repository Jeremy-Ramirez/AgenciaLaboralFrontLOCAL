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
import { ActivatedRoute, Params } from '@angular/router';
import {Emitters} from '../clases/emitters';
@Component({
  selector: 'app-vista-perfil-empresas',
  templateUrl: './vista-perfil-empresas.component.html',
  styleUrls: ['./vista-perfil-empresas.component.css']
})
export class VistaPerfilEmpresasComponent implements OnInit {
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
    private httpClient:HttpClient,
    private rutaActiva: ActivatedRoute,
    ) { 
      
  }
  
  ngOnInit() {
    this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.idempresa = params.id;
      }
    )
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
    this._empresaService.getEmpresasbyid(this.idempresa).subscribe((resp:any)=>{
      Emitters.authEmitter.emit(true);
      this.ruc_cedula=resp.ruc_cedula
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

}
