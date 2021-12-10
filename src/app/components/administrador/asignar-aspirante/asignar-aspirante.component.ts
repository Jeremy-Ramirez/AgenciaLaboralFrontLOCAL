import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AsignarAspirantesService } from 'src/app/servicios/asignar-aspirantes.service';
import { of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-asignar-aspirante',
  templateUrl: './asignar-aspirante.component.html',
  styleUrls: ['./asignar-aspirante.component.css']
})
export class AsignarAspiranteComponent implements OnInit {
  profesiones:any[]=[];

  PROV:any;

  aspirantesSeleccionadosProf : any[] = [];
  aspirantesSeleccionadosNiv : any[] = [];
  aspirantesSeleccionadosProv : any[] = [];
  aspirantesSeleccionadosCiu : any[] = [];
  aspirantesSeleccionadosEst : any[] = [];
  aspirantesSeleccionadosGen : any[] = [];


  formacionesProfesionales: any[] = [];
  
  aspirantesSeleccionados : any[] = [];
  usuariosSeleccionados : any[] = [];
  aspirantes:any[]=[];
  usuarios:any[]=[];
  ciudades:any[]=[];
  ciudadesPorProvincia:any[]=[];
  provincias:any[]=[];
  nivelesestudios:any[]=[];

  cargando = false;

  miFormulario: FormGroup = this.fb.group({
    profesiones_idprofesiones:      ['', Validators.required],
    nivelestudios_idnivelestudios:  ['', Validators.required],
    provincia_idprovincia:          ['', Validators.required],
    ciudad_idciudad:                ['', Validators.required],
    estadoestudios:                 ['', Validators.required],
    areaestudios:                   ['', Validators.required],
    centroeducativo:                ['', Validators.required],
  })

  constructor( private fb: FormBuilder,
               private asignarAspiranteService : AsignarAspirantesService) { }

  ngOnInit(): void {
    this.asignarAspiranteService.getProfesiones().subscribe(profesiones=>{
      this.profesiones=profesiones;
      console.log(this.profesiones)
    })

    this.asignarAspiranteService.getProvincias().subscribe(provincias=>{
      this.provincias=provincias;
      console.log(this.provincias)
    })
    this.asignarAspiranteService.getCiudades().subscribe(ciudades=>{
      this.ciudades=ciudades;
      console.log(this.ciudades)
    })

    this.asignarAspiranteService.getAspirantes().subscribe(aspirantes=>{
      this.aspirantes=aspirantes;
      console.log(this.aspirantes)
    })

    this.asignarAspiranteService.getUsuarios().subscribe(usuarios=>{
      this.usuarios=usuarios;
      console.log(this.usuarios)
    })

    this.asignarAspiranteService.getNivelEstudios().subscribe(nivelesestudios=>{
      this.nivelesestudios=nivelesestudios;
      console.log(this.nivelesestudios)
    })

    this.asignarAspiranteService.getFormaciones().subscribe(formacionesProfesionales=>{
      this.formacionesProfesionales=formacionesProfesionales;
      console.log(this.formacionesProfesionales)
    })

    /*this.miFormulario.get('profesiones_idprofesiones')?.valueChanges
    .subscribe( idprofesiones =>{

      this.asignarAspiranteService.getUsuarios().subscribe(aspirantes=>{
        this.aspirantes=aspirantes;
        console.log(this.aspirantes)
      })

      console.log("iddd" ,idprofesiones)
      this.aspirantesSeleccionados = this.getAspirantesPorProfesiones( idprofesiones )

      })*/
      //permite transformar el valor del get, disparar eventos simultaneos
      this.miFormulario.get('profesiones_idprofesiones')?.valueChanges
      .pipe(
        tap( (_) =>{
          //this.aspirantesSeleccionados=[]
          this.miFormulario.get('ciudad_idciudad')?.reset('');
          this.miFormulario.get('provincia_idprovincia')?.reset('');
          this.miFormulario.get('nivelestudios_idnivelestudios')?.reset('');
          this.miFormulario.get('estadoestudios')?.reset('');

          this.cargando = true;
        }),
        //valor producto del primer observable
        switchMap( idprofesiones => this.aspirantesSeleccionados=this.getAspirantesPorProfesiones( idprofesiones )  )
      )
      .subscribe( valor =>{
        /*console.log("ESTE ES EL VALOR ", valor)
        this.usuariosSeleccionados=[]
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosProf;
        this.cargando = false;
        console.log("prof",this.aspirantesSeleccionadosProf)
        console.log("profnormal",this.aspirantesSeleccionados)*/
        /*this.aspirantesSeleccionados.indexOf(valor) === -1? this.aspirantesSeleccionados.push(valor):
            console.log("This item already exists");*/
        
        this.cargando = false;
   
      })

      this.miFormulario.get('nivelestudios_idnivelestudios')?.valueChanges
      .pipe(
        tap( (_) =>{
          //this.aspirantesSeleccionados=[]
          this.usuariosSeleccionados=[]
          this.miFormulario.get('estadoestudios')?.reset('');
          this.miFormulario.get('provincia_idprovincia')?.reset('');
          this.miFormulario.get('ciudad_idciudad')?.reset('');
         
          this.cargando = true;
          
          
        }),
        //valor producto del primer observable
        switchMap( nivelestudios => this.aspirantesSeleccionados=this.getAspirantesPorNivel( nivelestudios )  )

        //switchMap( nivelestudios => this.aspirantesSeleccionados = this.getAspirantesPorProfesiones( nivelestudios )  )
      )
      .subscribe( valor =>{
        /*this.usuariosSeleccionados=[]
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosNiv;
        this.cargando = false;
        console.log("niv",this.aspirantesSeleccionadosNiv)
        console.log("nivnormal",this.aspirantesSeleccionados)*/
        /*this.aspirantesSeleccionados.indexOf(valor) === -1? this.aspirantesSeleccionados.push(valor):
            console.log("This item already exists");*/
        
        this.cargando = false;

      })

      this.miFormulario.get('estadoestudios')?.valueChanges
      .pipe(
        tap( (_) =>{
          this.usuariosSeleccionados=[]
          this.miFormulario.get('provincia_idprovincia')?.reset('');
          this.miFormulario.get('ciudad_idciudad')?.reset('');
          //this.aspirantesSeleccionados=[]
          this.cargando = true;
        }),
        //valor producto del primer observable
        switchMap( estadoestudios =>this.aspirantesSeleccionados=this.getAspirantesPorEstadoEstudios( estadoestudios )  )
      )
      .subscribe( valor =>{
        /*this.usuariosSeleccionados=[]
        
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosCiu;
        this.cargando = false;
        console.log("ciu",this.aspirantesSeleccionadosCiu)
        console.log("ciunormal",this.aspirantesSeleccionados)*/
        /*this.aspirantesSeleccionados.indexOf(valor) === -1? this.aspirantesSeleccionados.push(valor):
            console.log("This item already exists");*/
        this.cargando = false;
        
      })

      this.miFormulario.get('provincia_idprovincia')?.valueChanges
      .pipe(
        tap( (_) =>{
          this.usuariosSeleccionados=[]
          //this.aspirantesSeleccionados=[]
          this.miFormulario.get('ciudad_idciudad')?.reset('');
          this.cargando = true;
          
        }),
        //valor producto del primer observable
        switchMap( provincia =>this.aspirantesSeleccionados=this.getAspirantesPorProvincia( provincia )  )

        //switchMap( nivelestudios => this.aspirantesSeleccionados = this.getAspirantesPorProfesiones( nivelestudios )  )
      )
      .subscribe( valor =>{
        console.log("ESTE ES EL VALOR ", valor)
        /*this.usuariosSeleccionados=[]
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosProv;
        this.cargando = false;
        console.log("prov",this.aspirantesSeleccionadosProv)
        console.log("provnormal",this.aspirantesSeleccionados)*/
        /*this.aspirantesSeleccionados.indexOf(valor) === -1? this.aspirantesSeleccionados.push(valor):
            console.log("This item already exists");*/
        this.cargando = false;

        
      })

      this.miFormulario.get('provincia_idprovincia')?.valueChanges.subscribe(prov=>{
        this.PROV= prov
        console.log('prov'+this.PROV)
      })
      
      this.miFormulario.get('provincia_idprovincia')?.valueChanges.pipe(
      tap((_)=>{
        this.miFormulario.get('ciudad_idciudad').reset(" ");
        this.ciudadesPorProvincia=[];
      }),
      switchMap(cx=>this.asignarAspiranteService.getCiudades())
      
      
      ).subscribe((r:any)=>{
        let ciudades=r
        for(let cd of ciudades){
          if(cd.provincia_idprovincia == this.PROV){
            console.log(cd)
            this.ciudadesPorProvincia.push(cd)
          }
          
        }
        //console.log(this.ciudades)
      })



      this.miFormulario.get('ciudad_idciudad')?.valueChanges
      .pipe(
        tap( (_) =>{
          this.usuariosSeleccionados=[]
          //this.aspirantesSeleccionados=[]
          this.cargando = true;
        }),
        //valor producto del primer observable
        switchMap( ciudad =>this.aspirantesSeleccionados=this.getAspirantesPorCiudad( ciudad )  )
      )
      .subscribe( valor =>{

        console.log("VALOR DE CIUDAD", valor )
        /*this.usuariosSeleccionados=[]
        
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosCiu;
        this.cargando = false;
        console.log("ciu",this.aspirantesSeleccionadosCiu)
        console.log("ciunormal",this.aspirantesSeleccionados)*/
        /*this.aspirantesSeleccionados.indexOf(valor) === -1? this.aspirantesSeleccionados.push(valor):
            console.log("This item already exists");*/
        this.cargando = false;
        
      })

      


      

      /*this.miFormulario.get('profesiones_idprofesiones')?.valueChanges
      .pipe(
        tap( (_) =>{
          this.miFormulario.get('aspirantes')?.reset('');
        }),
        //valor producto del primer observable
        switchMap( idprofesiones => this.aspirantesSeleccionados = this.getAspirantesPorProfesiones( idprofesiones )  )
      )
      .subscribe( valor =>{
        console.log(valor)
      })*/

      
  }

  guardar(){
    console.log(this.miFormulario.value)
  }

  getAspirantesPorProfesiones( profesion: string){
    let aspirantesSeleccionadosProf = [];
    if(profesion == "todos"){
      aspirantesSeleccionadosProf= this.aspirantes
    }else if(profesion==""){
      this.cargando=false;
    }
    else if( profesion!="todos" && profesion!=""){
      for(let aspirante of this.aspirantes){
        
        if(aspirante.profesiones_idprofesiones == profesion){
          console.log("hay en esta prof")
          
          aspirantesSeleccionadosProf.indexOf(aspirante) === -1 ? aspirantesSeleccionadosProf.push(aspirante): 
          console.log("This item already exists",aspirantesSeleccionadosProf);
        }
        else
        {
          console.log("no hay todos por prof")
          const index= aspirantesSeleccionadosProf.indexOf(aspirante);
          aspirantesSeleccionadosProf.indexOf(aspirante) > -1 ? aspirantesSeleccionadosProf.splice(index,1):
          console.log("Borrado prof");
        }
      }
    }
    this.aspirantesSeleccionadosProf=aspirantesSeleccionadosProf
    return aspirantesSeleccionadosProf;

  }


  getAspirantesPorNivel( nivelestudios: string){
    let aspirantesSeleccionadosNiv = [];
    if(nivelestudios == "todos"){
      aspirantesSeleccionadosNiv=this.aspirantesSeleccionadosProf
      
    }else if(nivelestudios==""){
      this.cargando=false;
    }

    else if( nivelestudios!="todos" && nivelestudios!=""){
      
      for(let aspirante of this.aspirantesSeleccionadosProf){

        for (let formacion of this.formacionesProfesionales){

          if(formacion.aspirante_idaspirante == aspirante.idaspirante){
            if(formacion.nivelestudios_idnivelestudios == nivelestudios){
              console.log("hay en este niv")
              aspirantesSeleccionadosNiv.indexOf(aspirante) === -1 ? aspirantesSeleccionadosNiv.push(aspirante):
              console.log("This item already exists");
            }
            else
            {
              console.log("no hay todos por niv")
                const index= aspirantesSeleccionadosNiv.indexOf(aspirante);
                aspirantesSeleccionadosNiv.indexOf(aspirante) > -1  ? aspirantesSeleccionadosNiv.splice(index,1):
                console.log("Borrado niv ");
            }
          }

        }


        
      }
    }
    this.aspirantesSeleccionadosNiv=aspirantesSeleccionadosNiv
    return aspirantesSeleccionadosNiv;
  }

  getAspirantesPorEstadoEstudios( estadoestudios: string){
    let aspirantesSeleccionadosEst = [];
    if(estadoestudios == "todos"){
      aspirantesSeleccionadosEst=this.aspirantesSeleccionadosNiv
      
    }else if(estadoestudios==""){
      this.cargando=false;
    }

    else if( estadoestudios!="todos" && estadoestudios!=""){
      
      for(let aspirante of this.aspirantesSeleccionadosNiv){

        for (let formacion of this.formacionesProfesionales){

          if(formacion.aspirante_idaspirante == aspirante.idaspirante){
            //if(this.miFormulario.get("nivelestudios_idnivelestudios")==formacion.nivelestudios_idnivelestudios){
              console.log("aqui entra a nivel")
              if(formacion.estadoestudios == estadoestudios){
                console.log("hay en este est")
                aspirantesSeleccionadosEst.indexOf(aspirante) === -1 ? aspirantesSeleccionadosEst.push(aspirante):
                console.log("This item already exists");
              }
              else
              {
                console.log("no hay todos por est")
                  const index= aspirantesSeleccionadosEst.indexOf(aspirante);
                  aspirantesSeleccionadosEst.indexOf(aspirante) > -1  ? aspirantesSeleccionadosEst.splice(index,1):
                  console.log("Borrado est ");
              }

            //}
          }

        }


        
      }
    }
    this.aspirantesSeleccionadosEst=aspirantesSeleccionadosEst
    return aspirantesSeleccionadosEst;
  }

  getAspirantesPorProvincia( provincia: string){
    let aspirantesSeleccionadosProv = []
    if(provincia == "todos"){
      aspirantesSeleccionadosProv=this.aspirantesSeleccionadosEst

    }else if(provincia==""){
      this.cargando=false;
    }
    else if( provincia!="todos" && provincia!=""){
    
      for(let aspirante of this.aspirantesSeleccionadosEst){
        for(let usuario of this.usuarios){
          if(usuario.idusuario ==aspirante.usuario_idusuario){
            
            if(usuario.provincia_idprovincia == provincia){
              console.log("hay en esta prov")
              aspirantesSeleccionadosProv.indexOf(aspirante) === -1? aspirantesSeleccionadosProv.push(aspirante):
              console.log("This item already exists");
            }
            else
            {
              console.log("no hay todos por prov")
              const index= aspirantesSeleccionadosProv.indexOf(aspirante);
              aspirantesSeleccionadosProv.indexOf(aspirante) > -1 ? aspirantesSeleccionadosProv.splice(index,1):
              console.log("Borrado prov");
            }
          }
        }
      }


    }
    this.aspirantesSeleccionadosProv=aspirantesSeleccionadosProv
    return aspirantesSeleccionadosProv;
  }

  getAspirantesPorCiudad( ciudad: string){
    let aspirantesSeleccionadosCiu = [];
    if(ciudad == "todos"){
      aspirantesSeleccionadosCiu=this.aspirantesSeleccionadosProv
      //return aspirantesSeleccionadosCiu;
    }else if(ciudad==""){
      this.cargando=false;
    }else if( ciudad!="todos" && ciudad!=""){
    //console.log("no hay usuario por ciudad")

      for(let aspirante of this.aspirantesSeleccionadosProv){
        for(let usuario of this.usuarios){
          if(usuario.idusuario ==aspirante.usuario_idusuario){
            if(usuario.ciudad_idciudad == ciudad){
              console.log("hay en esta ciu")
              aspirantesSeleccionadosCiu.indexOf(aspirante) === -1? aspirantesSeleccionadosCiu.push(aspirante):
              console.log("This item already exists");
            }
            else
            {
              console.log("no hay todos por ciu")
              const index= aspirantesSeleccionadosCiu.indexOf(aspirante);
              aspirantesSeleccionadosCiu.indexOf(aspirante) > -1 ? aspirantesSeleccionadosCiu.splice(index,1):
              console.log("Borrado ciu");
            }
          }
        }
      }
    }
    this.aspirantesSeleccionadosCiu=aspirantesSeleccionadosCiu
    
    return aspirantesSeleccionadosCiu;
  }

  
  
  

  getAspirantesPorGenero( genero: string){
    if(genero == "todos"){
      this.aspirantesSeleccionadosGen=this.aspirantesSeleccionadosCiu
    }else{
    console.log("no hay usuario por ciudad")
    for(let aspirante of this.aspirantesSeleccionadosCiu){
      for(let usuario of this.usuarios){
        if(usuario.idusuario ==aspirante.usuario_idusuario){
          if(usuario.genero_idgenero == genero){
            this.aspirantesSeleccionadosGen.indexOf(aspirante) === -1? this.aspirantesSeleccionadosGen.push(aspirante):
            console.log("This item already exists");
          }
          else
          {
            const index= this.aspirantesSeleccionadosGen.indexOf(aspirante);
            this.aspirantesSeleccionadosGen.indexOf(aspirante) > -1 ? this.aspirantesSeleccionadosGen.splice(index,1):
            console.log("Borrado");
          }
        }
      }
    }
    }
    return this.aspirantesSeleccionadosGen;
  }

  


   /*getAspirantesPorProfesiones( profesion: string){
    this.aspirantesSeleccionados=[];
    for(let aspirante of this.aspirantes){
      console.log("a")
      if(aspirante.profesiones_idprofesiones == profesion){
        console.log("a")
        this.aspirantesSeleccionados.push(aspirante);
      }
    }
    return this.aspirantesSeleccionados;

    //return this.httpClient.get(this.API + 'usuarios/')
  }*/


}
