import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'
import {throwError} from 'rxjs';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  tipopersonas:any[]=[]; 
  tipodocumentos:any[]=[];
  tipoempresas:any[]=[];
  ramaactividads:any[]=[];
  actividadeconomicas:any[]=[];
  ciudades:any[]=[];
  provincias: any[]=[];
  sectores: any[]=[];
  empresas: any []=[];

  constructor(
    private _ciudadService: CiudadService,
    private _provinciaService: ProvinciaService,
    private form: FormBuilder,
    private httpClient:HttpClient
    ) { 
  }
  

  ngOnInit(): void {
   
    this._ciudadService.getCiudades().subscribe((resp:any)=>{
      this.ciudades=resp
      console.log(resp)

    });
    this._provinciaService.getProvincias().subscribe((resp:any)=>{
      this.provincias=resp
      console.log(resp)

    });
    
  }
  
  formSolicitud: FormGroup = this.form.group({
    profesion: ["", [Validators.required]],
    aniosexperiencia: ["",[Validators.required]],
    rangoedad: ["",[Validators.required]],
    experticia: ["",[Validators.required]],
    sueldo: ["",[Validators.required]],
    fechainicio: ["",[Validators.required]],
    fechacierre: ["",[Validators.required]],
    cargo: ["",[Validators.required]],
    tiposolicitud_idtiposolicitud: 1,
    estado_idestado: 1,
    representante_idrepresentante: 1,
    descripcioncargo: ["",[Validators.required]],
    ciudad_idciudad: ["",[Validators.required]],
    provincia_idprovincia: ["",[Validators.required]],
    educacion_minima: ["",[Validators.required]],
    jornada: ["",[Validators.required]],
    discapacidad: ["",[Validators.required]],
    disponibilidad_viajar: ["",[Validators.required]],
    disponibilidad_cambioresidencia: ["",[Validators.required]],
    licencia: ["",[Validators.required]],
    idiomas: ["",[Validators.required]]
  })
  crear(){
    if(this.formSolicitud.invalid) {
      return Object.values(this.formSolicitud.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
      console.log(this.formSolicitud.value);
      this.httpClient.post('http://localhost:8000/api/solicitudes/', this.formSolicitud.value).subscribe(
        resp => console.log(resp),
        err => console.log(err)
  
      )
    alert('SOLICITUD CREADA')
  }
  
  campoEsValido( campo: string){
    return this.formSolicitud.controls[campo].errors  && this.formSolicitud.controls[campo].touched;
  }
}
