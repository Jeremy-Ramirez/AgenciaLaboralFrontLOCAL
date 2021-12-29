import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'

import {switchMap,tap} from 'rxjs/operators'
import { ProfesionesService } from '../../../servicios/profesiones.service';
import { GeneroService } from '../../../servicios/genero.service';

import { HttpClient } from '@angular/common/http';

import { NivelEstudiosService } from '../../../servicios/nivel-estudios.service';
import { RegistroFullEmpresaComponent } from '../../empresa/registro-full-empresa/registro-full-empresa.component';
import { Subscription,observable, Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  //@Input() usuarioActual:RegistroFullEmpresaComponent;
  public keyword="profesion";
  public data$ :Observable<any[]>;
  Valor:any;

  opcionSeleccionado: string  = '';
  verSeleccion: string        = '';

  opcionSeleccionadoC: string  = '';
  verSeleccionC: string        = '';

  disponibilidadSeleccionada: string ='';
  cambioresidenciaSeleccionada: string ='';

  @Input() usuarioActual:any;
  
  provincias:any[]=[];
  ciudades: any[]=[];
  ciudesE:any[]=[];
  PROV:any;
  profesiones: any[]=[];
  profesiondesc ='';
  generos: any[]=[];
  usuarios:any[]=[];
  niveles: any[]=[];
  Genero:any;
  Provincia:any;
  Ciudad:any;
  aspirantes: any[]=[];
  Posibilidad: any;
  Cambio:any;
  Nivel:any;


  miFormulario: FormGroup= this.fb.group({
    provincia:['',],
    ciudad:['',],
    profesiones_idprofesiones:['',],
    genero:[''],
    posibilidadviajar:[''],
    posibilidadcambioresidencia:[''],
    tiposolicitud_idtiposolicitud:2,
    nivelestudios_idnivelestudios:[''],
  })

  constructor(private fb:FormBuilder,private _ciudadService: CiudadService,
    private _provinciaService: ProvinciaService,
    private _profesionService: ProfesionesService,
    private _generoService: GeneroService,
    private _nivelestudiosService: NivelEstudiosService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getProfesiones();
    this._provinciaService.getProvincias().subscribe((resp:any)=>{
      this.provincias=resp
      console.log(this.provincias)

    });
/*
    this._ciudadService.getCiudades().subscribe((resp:any)=>{
      this.ciudades=resp
    })

*/
/*
    this._profesionService.getProfesiones().subscribe((resp:any)=>{
      this.profesiones=resp;
    })
*/
    this._nivelestudiosService.getNivel().subscribe((resp:any)=>{
      this.niveles=resp;
    })


        /*Aspirantes*/ 
    this.http.get('http://127.0.0.1:8000/api/aspirantes/').subscribe((resp:any)=>{
        this.aspirantes=resp;
        for(let p of this.profesiones){
          for(let a of this.aspirantes){
              if(p.idprofesiones == a.profesiones_idprofesiones){
                this.profesiondesc=p.profesion;
              }
          }
          
        }
    })

    

    this._generoService.getGeneros().subscribe((resp:any)=>{
      this.generos=resp;
    })

    this.http.get('http://localhost:8000/api/usuarios/').subscribe((resp:any)=>{
      this.usuarios=resp
    })

    //this.Genero=this.miFormulario.controls['genero'].value
    /*
    this.Genero=this.miFormulario.get('genero')
    this.Provincia= this.miFormulario.get('provincia')
    this.Ciudad= this.miFormulario.get('ciudad')
    this.Posibilidad= this.miFormulario.get('posibilidadviajar')
    this.Cambio= this.miFormulario.get('posibilidadcambioresidencia')
    this.Nivel= this.miFormulario.get('nivelestudios_idnivelestudios')
*/












    //Cuando cambie mi primer selector

  /*this.miFormulario.get('provincia')?.valueChanges.subscribe(prov=>{
      console.log(prov)

      this._ciudadService.getCiudades().subscribe((resp:any)=>{
        this.ciudades=resp
        for (let c of this.ciudades){
          if(c.provincia_idprovincia == prov){
              this.ciudesE.push(c)
          }
        }
      });


    });*/

this.miFormulario.get('provincia')?.valueChanges.subscribe(prov=>{
  this.PROV= prov
  console.log('prov'+this.PROV)
})

this.miFormulario.get('provincia')?.valueChanges.pipe(
tap((_)=>{
  this.miFormulario.get('ciudad').reset(" ");
  this.ciudesE=[];
}),
switchMap(cx=>this._ciudadService.getCiudades())


).subscribe((r:any)=>{
  this.ciudades=r
  for(let cd of this.ciudades){
    if(cd.provincia_idprovincia == this.PROV){
      console.log(cd)
      this.ciudesE.push(cd)
    }
    
  }
  //console.log(this.ciudades)
})
      



    /*this.miFormulario.get('provincia')?.valueChanges
    .pipe(
      tap((_)=>{
        this.miFormulario.get('ciudad')?.reset('');
      }),
      switchMap(prov=>
        this._ciudadService.getCiudades()
      )

    )
    .subscribe((resp:any)=>{
      this.ciudades=resp
      for (let c of this.ciudades){
        if(c.provincia_idprovincia == resp){
            this.ciudesE.push(c)
        }
      }
    });

*/


  }



  getProfesiones():void{

    this.data$= this._profesionService.getProfesiones();
    /* this._profesiones.getProfesiones().subscribe((resp:any)=>{
      this.profesiones=resp;
      console.log('PROFESIONES:',this.profesiones)
    })
*/
  }

  selectEvent(item) {
    // do something with selected item
    //console.log(item.idprofesiones)
    //item.idprofesiones=this.miFormulario.get('profesiones_idprofesiones').value
    this.Valor= item.idprofesiones;
    console.log(this.Valor)
  }



  solicitar(){
    console.log(this.miFormulario.value);
    console.log(this.Genero.value)
    
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
}


capturarCiudad(){
  this.verSeleccionC = this.opcionSeleccionadoC;
}

radioChangeHandler(event:any){
  this.disponibilidadSeleccionada= event.target.value;
}
radioChangeHandler2(event:any){
  
  this.cambioresidenciaSeleccionada= event.target.value;
}


}
