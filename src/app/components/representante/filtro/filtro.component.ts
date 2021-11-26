import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'

import {switchMap,tap} from 'rxjs/operators'
import { ProfesionesService } from '../../../servicios/profesiones.service';
import { GeneroService } from '../../../servicios/genero.service';

import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {


  provincias:any[]=[];
  ciudades: any[]=[];
  ciudesE:any[]=[];
  PROV:any;
  profesiones: any[]=[];
  profesiondesc ='';
  generos: any[]=[];
  usuarios:any[]=[];
  Genero:any;
  Provincia:any;
  Ciudad:any;
  aspirantes: any[]=[];
  Posibilidad: any;
  Cambio:any;


  miFormulario: FormGroup= this.fb.group({
    provincia:['',],
    ciudad:['',],
    profesiones_idprofesiones:['',],
    genero:[''],
    posibilidadviajar:[''],
    posibilidadcambioresidencia:[''],

  })

  constructor(private fb:FormBuilder,private _ciudadService: CiudadService,
    private _provinciaService: ProvinciaService,
    private _profesionService: ProfesionesService,
    private _generoService: GeneroService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this._provinciaService.getProvincias().subscribe((resp:any)=>{
      this.provincias=resp
      console.log(this.provincias)

    });

    this._profesionService.getProfesiones().subscribe((resp:any)=>{
      this.profesiones=resp;
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
    this.Genero=this.miFormulario.get('genero')
    this.Provincia= this.miFormulario.get('provincia')
    this.Ciudad= this.miFormulario.get('ciudad')
    this.Posibilidad= this.miFormulario.get('posibilidadviajar')
    this.Cambio= this.miFormulario.get('posibilidadcambioresidencia')













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








  solicitar(){
    console.log(this.miFormulario.value);
    console.log(this.Genero.value)
    
  }


}
