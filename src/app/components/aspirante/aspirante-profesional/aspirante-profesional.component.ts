import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesionesService } from '../../../servicios/profesiones.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Emitters } from '../clases/emitters';
import { FormacionProfesionalService } from '../../../servicios/formacion-profesional.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-aspirante-profesional',
  templateUrl: './aspirante-profesional.component.html',
  styleUrls: ['./aspirante-profesional.component.css']
})
export class AspiranteProfesionalComponent implements OnInit {


  file:any='';
  videoValido: boolean=true;
  fechaCorrecta=true;
  profesiones:any[]=[];
  aspirantes:any[]=[];
  niveles:any[]=[];
  id: any;
  message = '';

  agregarUnaFormacion=true;

  listaFormaciones:any[]=[];
  idAspirante:any;
  nombresNiveles:any;
  suscription: Subscription; 
  //validaciones
  fechaCorrectaInicio=true;
  fechaCorrectaCierre=true;
  siguiente=false;
  loading: boolean;

  bandera=false;
/*DATOS DEL FORM PROFESIONAL*/

  Profesiones:any;
  DescripcionProf:any;
  Salario:any;
  Video:any;
  AniosExperiencia:any;
  FechaNacimiento:any;
  NumeroHijos:any;
  PViajar:any;
  PCambiar:any;
  Idiomas:any;




  constructor(private fb: FormBuilder,private _profesiones:ProfesionesService,private http:HttpClient, private rutaActiva: ActivatedRoute, 
    private formacionProfesionalService: FormacionProfesionalService, private router: Router) {
      this.loading=false;
  }
  
    


 
  miFormulario: FormGroup= this.fb.group({
    
    numerohijos: ["", [Validators.required]],
    salarioMinimoAceptado: ["", [Validators.required]],
    descripcionPerfilProfesional:["",[Validators.required]],
    videopresentacion:["",[Validators.required, Validators.pattern("^.*\.(mp4|mkv|avi)$")]],
    aniosexperiencia:["",[Validators.required]],
    fechanacimiento:["",[Validators.required, ]],
    posibilidadviajar:["",[Validators.required,Validators.maxLength(2),Validators.pattern("(si|no)+")]],
    posibilidadcambioresidencia:["",[Validators.required,Validators.maxLength(2),Validators.pattern("(si|no)+")]],
    profesiones_idprofesiones:["",[Validators.required]],
    idiomas:["",[Validators.required]],
    usuario_idusuario:null,
    estadoaspirantes_idestadoaspirantes:2,

    
    /*nivelestudios_idnivelestudios: ["", [Validators.required]],
    centroeducativo: ["", [Validators.required]],
    campolaboral:["",[Validators.required]],
    estadoestudios:["",[Validators.required]],
    fechainicio:["",[Validators.required]],
    fechacierre:["",[Validators.required, ]],
    aspirante_idaspirante:null,*/
  })


  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  miFormularioFormacion: FormGroup= this.fb.group({
    
    nivelestudios_idnivelestudios: ["", [Validators.required]],
    centroeducativo: ["", [Validators.required]],
    campolaboral:["",[Validators.required]],
    estadoestudios:["",[Validators.required]],
    areaestudios:["",[Validators.required]],
    fechainicio:["",[Validators.required]],
    fechacierre:["",[Validators.required]],
    aspirante_idaspirante:null,
    
  })

  campoEsValido2(campo: string){
    return this.miFormularioFormacion.controls[campo].errors 
            && this.miFormularioFormacion.controls[campo].touched;
  }


 
  ngOnInit(): void {
    this.getFormacionProfesional();
    this.getAspirantes();
    this.getNivelesEstudios();



    /*
  
  

  
    

  
  */ 


    this.NumeroHijos=this.miFormulario.get('numerohijos');
    this.Salario=this.miFormulario.get('salarioMinimoAceptado');
    this.DescripcionProf=this.miFormulario.get('descripcionPerfilProfesional');
    this.Video=this.miFormulario.get('videopresentacion');
    this.AniosExperiencia=this.miFormulario.get('aniosexperiencia');
    this.FechaNacimiento=this.miFormulario.get('fechanacimiento');
    this.PViajar=this.miFormulario.get('posibilidadviajar');
    this.PCambiar=this.miFormulario.get('posibilidadcambioresidencia');
    this.Profesiones=this.miFormulario.get('profesiones_idprofesiones');
    this.Idiomas=this.miFormulario.get('idiomas');



    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        for(let asp of this.aspirantes){
          console.log("aaa")
          if(asp.usuario_idusuario==res.idusuario){
            this.idAspirante=asp.idaspirante;
            console.log("ID DEL ASPIRANTE ACTUAL", this.idAspirante)
          }
        }
        
        Emitters.authEmitter.emit(true);
        
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
   
    this._profesiones.getProfesiones().subscribe((resp:any)=>{
      this.profesiones=resp;
      console.log(this.profesiones)
    })

    this.suscription = this.formacionProfesionalService.refresh$.subscribe(()=>{
      this.getFormacionProfesional();
    })

    

  }

  ngOnDestroy():void{
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }


  getAspirantes(){
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc;
    console.log("getaspirantes",this.aspirantes)
    })
  }


  getNivelesEstudios(){
    this.http.get('http://localhost:8000/api/nivelestudios/').subscribe((nivel:any)=>{
    this.niveles=nivel;
    console.log(this.niveles)
    })
  }

  getFormacionProfesional(){
    this.formacionProfesionalService.getFormacionProfesional().subscribe(listaFormaciones=>{
      this.listaFormaciones=listaFormaciones;
      console.log("FORMACION DEL USUARIO",this.listaFormaciones)
    })
  }

  

  
  
  handleFileInput(event: Event){
    if((<HTMLInputElement>event.target).files[0].size>6000000){
      this.videoValido=false;
      alert('El archivo supera los 6Mb.');
      
    }else{
      this.videoValido=true;
      this.file=(<HTMLInputElement>event.target).files[0];
      console.log("archivo", this.file)
    }
    

  
 }

/*siguiente*/ 
  guardar(){

    /*console.log(this.Profesiones.value);
    console.log(this.DescripcionProf.value);
    console.log(this.Salario.value);
    console.log(this.Video.value);
    console.log(this.AniosExperiencia.value);
    console.log(this.FechaNacimiento.value);
    console.log(this.NumeroHijos.value);
    console.log(this.PViajar.value);
    console.log(this.PCambiar.value);
    console.log(this.Idiomas.value);
  */



    /*let formData= new FormData();
    formData.append('numerohijos',this.miFormulario.controls['numerohijos'].value)
    formData.append('salarioMinimoAceptado',this.miFormulario.controls['salarioMinimoAceptado'].value)
    formData.append('descripcionPerfilProfesional',this.miFormulario.controls['descripcionPerfilProfesional'].value)
    formData.append('aniosexperiencia',this.miFormulario.controls['aniosexperiencia'].value)
    formData.append('fechanacimiento',this.miFormulario.controls['fechanacimiento'].value)
    formData.append('videopresentacion',this.file)
    formData.append('posibilidadviajar',this.miFormulario.controls['posibilidadviajar'].value)
    formData.append('posibilidadcambioresidencia',this.miFormulario.controls['posibilidadcambioresidencia'].value)
    formData.append('profesiones_idprofesiones',this.miFormulario.controls['profesiones_idprofesiones'].value)
    formData.append('idiomas',this.miFormulario.controls['idiomas'].value)
    formData.append('usuario_idusuario',this.id)
    //formData.append('estadoaspirantes_idestadoaspirantes',this.miFormulario.controls['estadoaspirantes_idestadoaspirantes'].value)


    for(let asp of this.aspirantes){
      if(asp.usuario_idusuario==this.id){

        console.log(asp.idaspirante);
        this.http.put('http://localhost:8000/api/aspirantes/'+ asp.idaspirante, formData).subscribe(
          resp => console.log(resp),
          err => console.log(err)
    
        )
      }

    }

    /*for(let formacion of this.listaFormaciones){
      this.guardarFormación(formacion)
    }*/







    this.siguientePagina();

    
    
    
  
  }

  guardarFormacion(){

    for(let asp of this.aspirantes){
      if(asp.usuario_idusuario==this.id){
        
        this.miFormularioFormacion.get('aspirante_idaspirante').setValue(asp.idaspirante);


        
        console.log(asp.idaspirante);
        /*this.http.post('http://localhost:8000/api/formacionprofesional/', this.miFormularioFormacion.value).subscribe(
          resp => console.log(resp),
          err => console.log(err)
        )*/


        this.formacionProfesionalService.postFormacionProfesional(
          this.miFormularioFormacion.value).subscribe(data=>{
            console.log("Datos del post",data)
            this.miFormularioFormacion.reset();
          });
        
      }

    }
    
    
  
  }

  eliminarFormacion(event: Event){
    if(confirm("¿Seguro desea eliminar el archivo?")){
      for(let doc of this.listaFormaciones){
        if(doc.idformacionprofesional == event){
          this.listaFormaciones.splice(this.listaFormaciones.findIndex(item=> item.idformacionprofesional === event),1)
          this.formacionProfesionalService.deleteFormacionProfesional(
            event).subscribe(data=>{
              
              alert('Información de estudios Borrada')
              
            });
        }
      }
    }
  }


  
  
  validarFechaNacimiento(){
    
    let fechaNacimiento=this.miFormulario.controls['fechanacimiento'].value
    console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]  
    let diaActual= fechaActual.substring(8,10)
    let mesActual= fechaActual.substring(5,7)
    let anioActual= fechaActual.substring(0,4)
    console.log(diaActual)
    console.log(mesActual)
    console.log(anioActual)
    let mesNacimiento= fechaNacimiento.substring(5,7)
    let diaNacimiento= fechaNacimiento.substring(8,10)
    let anioNacimiento= fechaNacimiento.substring(0,4)
    
    console.log(diaNacimiento)
    console.log(mesNacimiento)
    console.log(anioNacimiento)
    console.log("revisa")
    if(Number(anioActual)-Number(anioNacimiento)==18 ){
      console.log("mes resta",Number(mesActual)-Number(mesNacimiento))
      if(Number(mesActual)-Number(mesNacimiento)<0){
        console.log("es menor a 18")
        this.fechaCorrecta=false;
        console.log("dia resta",Number(diaActual)-Number(diaNacimiento))
        

      }
      if(Number(mesActual)-Number(mesNacimiento)==0){
        if(Number(diaActual)-Number(diaNacimiento)<0){
          console.log("es menor a 18")
          this.fechaCorrecta=false;
        }else{
          this.fechaCorrecta=true;
        }
      }
    }else if(Number(anioActual)-Number(anioNacimiento)<18 ){
      console.log("es menor a 18")
      this.fechaCorrecta=false;


    }else{
      this.fechaCorrecta=true;
    }

    /*if(fechaActual>fechaNacimiento){
      
      
      console.log("entra")
    }*/

  }

  nuevaFormacion(){
    this.agregarUnaFormacion=true;
  }
  
  cerrar(){
    this.agregarUnaFormacion=false;
  }

  siguientePagina(){
    this.siguiente=true;
  }

  anteriorPagina(){
    this.siguiente=false;
  }

  //Agrega una nueva formación a la lista

  agregarUna(){
    this.agregarUnaFormacion=false;
    //console.log(this.listaFormaciones)
    //this.listaFormaciones.push(this.miFormulario.controls)
    //console.log("formaciones",this.listaFormaciones)



  }


  guardarInfoProfesional(){

    let formData= new FormData();
    formData.append('numerohijos',this.NumeroHijos.value)
    formData.append('salarioMinimoAceptado',this.Salario.value)
    formData.append('descripcionPerfilProfesional',this.DescripcionProf.value)
    formData.append('aniosexperiencia',this.AniosExperiencia.value)
    formData.append('fechanacimiento',this.FechaNacimiento.value)
    formData.append('videopresentacion',this.file)
    formData.append('posibilidadviajar',this.PViajar.value)
    formData.append('posibilidadcambioresidencia',this.PCambiar.value)
    formData.append('profesiones_idprofesiones',this.Profesiones.value)
    formData.append('idiomas',this.Idiomas.value)
    formData.append('usuario_idusuario',this.id)
    formData.append('estadoaspirantes_idestadoaspirantes',this.miFormulario.controls['estadoaspirantes_idestadoaspirantes'].value)

    for(let asp of this.aspirantes){
      if(asp.usuario_idusuario==this.id){

        console.log(asp.idaspirante);
          //verifica si el form esta lleno o no

       
          this.http.patch('http://localhost:8000/api/aspirantes/'+ asp.idaspirante, formData).subscribe(
            resp => {
              console.log(resp)
            
              alert('DATOS PROFESIONALES GUARDADOS');
              this.router.navigate( [`/aspirante/sesionAspirante/perfilAspirante`]);
            
            
            },
            err => {
              console.log(err);
              
            }
      
          )
      
      
        
      }

    }

  }




  finalizar(){
    
    alert('DATOS PROFESIONALES GUARDADOS');
    this.router.navigate( [`/aspirante/sesionAspirante/perfilAspirante`]);

  }





  validarFechainicio(){
    
    let fechaNacimiento=this.miFormulario.controls['fechanacimiento'].value
    console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]  
    

    if(fechaNacimiento<this.miFormularioFormacion.controls['fechainicio'].value){
      this.fechaCorrectaInicio=true;
      
      console.log("entra")
    }else{
      this.fechaCorrectaInicio=false;

    }

  }


  validarFechacierre(){
    
    
    let fechaNacimiento=this.miFormularioFormacion.controls['fechacierre'].value
    console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]  
    

    if(fechaActual<=this.miFormularioFormacion.controls['fechacierre'].value){
      this.fechaCorrectaCierre=true;
      
      console.log("entra")
    }
    else{
      this.fechaCorrectaCierre=false;

    }

  }
}
