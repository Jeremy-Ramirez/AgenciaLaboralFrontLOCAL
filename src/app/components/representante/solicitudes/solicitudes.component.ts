import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'
import {throwError} from 'rxjs';
import { Emitters } from '../emitters/emitters';

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
  representantes: any []=[];

  id:'';
  message = '';
  usuarioActual: any;

  constructor(
    private _ciudadService: CiudadService,
    private _provinciaService: ProvinciaService,
    private form: FormBuilder,
    private httpClient:HttpClient,
    private http: HttpClient,
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

      this.http.get('http://localhost:8000/api/representantes/').subscribe((doc:any)=>{
        this.representantes=doc;
      console.log(this.representantes)
      })
    

    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        this.usuarioActual=res;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
    
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

    for(let rep of this.representantes){
        //console.log("REEEP",rep.idrepresentanteempresa)
        if(rep.usuario_idusuario== this.id){
          this.formSolicitud.patchValue({
            representante_idrepresentante: rep.idrepresentanteempresa, 
            
          });
          //console.log(rep.idrepresentanteempresa)
        }
    }
    
      console.log(this.formSolicitud.value);

        this.httpClient.post('http://localhost:8000/api/solicitudes/', this.formSolicitud.value).subscribe(
          resp => console.log(resp),
          err => console.log(err)
    
        );
      
    alert('SOLICITUD CREADA')
  }
  
  campoEsValido( campo: string){
    return this.formSolicitud.controls[campo].errors  && this.formSolicitud.controls[campo].touched;
  }
}
