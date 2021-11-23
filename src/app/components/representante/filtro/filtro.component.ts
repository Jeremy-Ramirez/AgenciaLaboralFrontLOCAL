import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CiudadService} from '../../../servicios/ciudad.service'
import {ProvinciaService} from '../../../servicios/provincia.service'
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {


  provincias:any[]=[];
  ciudades: any[]=[];
  ciudesE:any[]=[];

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

    this.miFormulario.get('provincia')?.valueChanges.subscribe(prov=>{
      console.log(prov)


      
    this._ciudadService.getCiudades().subscribe((resp:any)=>{
      this.ciudades=resp
      for (let c of this.ciudades){
        //console.log(c)

        ///console.log(c.provincia_idprovincia)
        ///console.log('prrov:'+prov)

        if(c.provincia_idprovincia == prov){
          console.log(c)
          
        }
        //console.log(this.ciudesE)
      }
      /*for(let ci of this.ciudades){
        if (ci.provincia_idprovincia === prov){
          this.ciudesE=ci
        }
      }*/
      ///console.log(this.ciudades)

    });
      /*this._ciudadService.getCiudadesID(prov).subscribe((ciudads:any)=>{
        this.ciudades=ciudads;
        console.log(ciudads)
      })*/


    })

  }

  solicitar(){
    console.log(this.miFormulario.value);
  }


}
