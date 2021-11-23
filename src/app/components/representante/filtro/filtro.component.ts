import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'

import {switchMap,tap} from 'rxjs/operators'


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

  miFormulario: FormGroup= this.fb.group({
    provincia:['',Validators.required],
    ciudad:['',Validators.required]
  })

  constructor(private fb:FormBuilder,private _ciudadService: CiudadService,
    private _provinciaService: ProvinciaService) { }

  ngOnInit(): void {

    this._provinciaService.getProvincias().subscribe((resp:any)=>{
      this.provincias=resp
      console.log(this.provincias)

    });
    

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
  }


}
