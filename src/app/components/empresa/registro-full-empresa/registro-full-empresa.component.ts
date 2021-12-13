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
  idDoc: any;
  selectedValue = '';
  public validadorDocs= false; 
  public validador= true; 
  public validadorruc= true; 
   
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

    if(this.validador==true && this.validadorruc==false ){
      this.validadorDocs = true;
    }
    if(this.validador==false && this.validadorruc==true ){
      this.validadorDocs = true;
    }
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
    correo:["",[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,3}$")]],
    celular:["",[Validators.required]],
    telefonooficina:["",[Validators.required]],
    contrasenia:["", [Validators.required]],
    estado_idestado: 1 
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



  //esta es la variable de validación
  validadorDeCedula() {
    this.validador = true;
    let cedulaCorrecta = false;
    
    let cedula_ruc=this.formEmpresa.controls['ruc_cedula'].value
    console.log(cedula_ruc.length)
    
    if (cedula_ruc.length == 10 && this.selectedValue=="1")
    {   
        
        let cedula = cedula_ruc ;
        let tercerDigito = parseInt(cedula.substring(2, 3));
        if (tercerDigito < 6) {
        
            // El ultimo digito se lo considera dígito verificador
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
            let verificador = parseInt(cedula.substring(9, 10));
            let suma:number = 0;
            let digito:number = 0;
            for (let i = 0; i < (cedula.length - 1); i++) {
                digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
                suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
            }
            
            suma= Math.round(suma);
          
          //  console.log(verificador);
          //  console.log(suma);
          //  console.log(digito);
  
            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
                cedulaCorrecta = true;
                
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
                cedulaCorrecta = true;
            } else {
                cedulaCorrecta = false;
            }
        } else {
            cedulaCorrecta = false;
        }
    } else {
        cedulaCorrecta = false;
    }
  
    
  this.validador= cedulaCorrecta;
    
  }

  validadorDeRuc() {
    this.validadorruc = true;
    let rucCorrecto = false;
    let ruc=this.formEmpresa.controls['ruc_cedula'].value
    if (ruc.length == 13 && this.selectedValue=="2"){
        rucCorrecto= true;
    }else {
      rucCorrecto = false;
    }
    this.validadorruc= rucCorrecto;
  }
  print(){
    //console.log(this.selectedValue)
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
