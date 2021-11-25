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
  aspirantesSeleccionadosProf : any[] = [];
  aspirantesSeleccionadosNiv : any[] = [];
  aspirantesSeleccionadosCiu : any[] = [];
  aspirantesSeleccionados : any[] = [];
  usuariosSeleccionados : any[] = [];
  aspirantes:any[]=[];
  usuarios:any[]=[];
  ciudades:any[]=[];
  provincias:any[]=[];
  nivelesestudios:any[]=[];
  miFormulario: FormGroup = this.fb.group({
    profesiones_idprofesiones: ['', Validators.required],
    nivelestudios_idnivelestudios: ['', Validators.required],
    ciudad_idciudad: ['', Validators.required]
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
          this.usuariosSeleccionados=[]
          this.miFormulario.get('nivelestudios_idnivelestudios')?.reset('');
          this.miFormulario.get('ciudad_idciudad')?.reset('');
          
        }),
        //valor producto del primer observable
        switchMap( idprofesiones => this.aspirantesSeleccionadosProf = this.getAspirantesPorProfesiones( idprofesiones )  )
      )
      .subscribe( valor =>{
        console.log(valor)
        console.log("prof",this.aspirantesSeleccionadosProf)
        this.usuariosSeleccionados=[]
        for(let usuario of this.usuarios){
          for(let asp of this.aspirantesSeleccionados){
            if( asp.usuario_idusuario == usuario.idusuario){
              this.usuariosSeleccionados.push(usuario)
            }
          }
        }
        
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosProf;
      })

      this.miFormulario.get('nivelestudios_idnivelestudios')?.valueChanges
      .pipe(
        tap( (_) =>{
          this.miFormulario.get('ciudad_idciudad')?.reset('');
          this.usuariosSeleccionados=[]
        }),
        //valor producto del primer observable
        switchMap( nivelestudios => this.aspirantesSeleccionadosNiv = this.getAspirantesPorNivel( nivelestudios )  )

        //switchMap( nivelestudios => this.aspirantesSeleccionados = this.getAspirantesPorProfesiones( nivelestudios )  )
      )
      .subscribe( valor =>{
        console.log(valor)
        console.log("niv",this.aspirantesSeleccionadosNiv)
        this.usuariosSeleccionados=[]
        for(let usuario of this.usuarios){
          for(let asp of this.aspirantesSeleccionados){
            if( asp.usuario_idusuario == usuario.idusuario){
              this.usuariosSeleccionados.push(usuario)
            }
          }
        }
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosNiv;
      })


      this.miFormulario.get('ciudad_idciudad')?.valueChanges
      .pipe(
        tap( (_) =>{
          //this.miFormulario.get('ciudad_idciudad')?.reset('');
          this.usuariosSeleccionados=[]
        }),
        //valor producto del primer observable
        switchMap( ciudad => this.aspirantesSeleccionadosCiu = this.getAspirantesPorCiudad( ciudad )  )

        //switchMap( nivelestudios => this.aspirantesSeleccionados = this.getAspirantesPorProfesiones( nivelestudios )  )
      )
      .subscribe( valor =>{
        console.log(valor)
        console.log("niv",this.aspirantesSeleccionadosCiu)
        this.usuariosSeleccionados=[]
        for(let usuario of this.usuarios){
          for(let asp of this.aspirantesSeleccionados){
            if( asp.usuario_idusuario == usuario.idusuario){
              this.usuariosSeleccionados.push(usuario)
            }
          }
        }
        this.aspirantesSeleccionados=this.aspirantesSeleccionadosCiu;
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
    
    //this.aspirantesSeleccionados=[];
    for(let aspirante of this.aspirantes){
      console.log("a")
      if(aspirante.profesiones_idprofesiones == profesion){
        console.log("b")
        this.aspirantesSeleccionadosProf.indexOf(aspirante) === -1 ? this.aspirantesSeleccionadosProf.push(aspirante): 
        console.log("This item already exists",this.aspirantesSeleccionadosProf);
        //this.aspirantesSeleccionados.push(aspirante);
      }
      else
      {
          const index= this.aspirantesSeleccionadosProf.indexOf(aspirante);
          console.log(aspirante.idaspirante)
          this.aspirantesSeleccionadosProf.indexOf(aspirante) > -1 ? this.aspirantesSeleccionadosProf.splice(index,1):
          console.log("Borrado");
      }
    }
    //this.aspirantesSeleccionados=this.aspirantesSeleccionadosProf;

    return this.aspirantesSeleccionadosProf;

    //return this.httpClient.get(this.API + 'usuarios/')
  }


  getAspirantesPorNivel( nivelestudios: string){
    /*if(!nivelestudios){
      return of (null)
    }*/
    //this.aspirantesSeleccionados=[];
    for(let aspirante of this.aspirantesSeleccionadosProf){
      console.log("a")
      if(aspirante.nivelestudios_idnivelestudios == nivelestudios){
        console.log("a")
        this.aspirantesSeleccionadosNiv.indexOf(aspirante) === -1 ? this.aspirantesSeleccionadosNiv.push(aspirante):
        console.log("This item already exists");
        console.log("niv",this.aspirantesSeleccionadosNiv)
        //this.aspirantesSeleccionados.push(aspirante);
      }
      else
      {
          const index= this.aspirantesSeleccionadosNiv.indexOf(aspirante);
          console.log(aspirante)
          this.aspirantesSeleccionadosNiv.indexOf(aspirante) > -1  ? this.aspirantesSeleccionadosNiv.splice(index,1):
          console.log("Borrado");
      }
    }
    //this.aspirantesSeleccionados=this.aspirantesSeleccionadosNiv
    return this.aspirantesSeleccionadosNiv;

    //return this.httpClient.get(this.API + 'usuarios/')
  }

  getAspirantesPorCiudad( ciudad: string){
    /*if(!nivelestudios){
      return of (null)
    }*/
    //this.aspirantesSeleccionados=[];
    console.log("no hay usuario")
    for(let aspirante of this.aspirantesSeleccionadosNiv){
      console.log(aspirante)
      for(let usuario of this.usuarios){
        console.log(usuario)
        if(usuario.idusuario ==aspirante.usuario_idusuario){
          
          console.log("hay usuario")
          if(usuario.ciudad_idciudad == ciudad){
            console.log("a")
            this.aspirantesSeleccionadosCiu.indexOf(aspirante) === -1? this.aspirantesSeleccionadosCiu.push(aspirante):
            console.log("This item already exists");
            //this.aspirantesSeleccionados.push(aspirante);
          }
          else
          {
              const index= this.aspirantesSeleccionadosCiu.indexOf(aspirante);
              console.log(aspirante)
              this.aspirantesSeleccionadosCiu.indexOf(aspirante) > -1 ? this.aspirantesSeleccionadosCiu.splice(index,1):
              console.log("Borrado");
          }
        }
      }
    }
    //this.aspirantesSeleccionados=this.aspirantesSeleccionadosCiu
    return this.aspirantesSeleccionadosCiu;

    //return this.httpClient.get(this.API + 'usuarios/')
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
