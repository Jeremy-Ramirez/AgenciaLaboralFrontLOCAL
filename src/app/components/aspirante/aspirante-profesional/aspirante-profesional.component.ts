import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesionesService } from '../../../servicios/profesiones.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-aspirante-profesional',
  templateUrl: './aspirante-profesional.component.html',
  styleUrls: ['./aspirante-profesional.component.css']
})
export class AspiranteProfesionalComponent implements OnInit {


  file: any;
  videoValido: boolean=true;
  fechaCorrecta=true;
  profesiones:any[]=[];
  aspirantes:any[]=[];
  niveles:any[]=[];
  id: any;
  message = '';
  constructor(private fb: FormBuilder,private _profesiones:ProfesionesService,private http:HttpClient, private rutaActiva: ActivatedRoute ) { }


 
  miFormulario: FormGroup= this.fb.group({
    
    numerohijos: ["", [Validators.required]],
    experiencialaboral: ["", [Validators.required]],
    campolaboral:["",[Validators.required]],
    experticia:["",[Validators.required]],
    videopresentacion:["",[Validators.required, Validators.pattern("^.*\.(mp4|mkv|avi)$")]],
    aniosexperiencia:["",[Validators.required]],
    fechanacimiento:["",[Validators.required, ]],
    posibilidadviajar:["",[Validators.required,Validators.maxLength(2),Validators.pattern("(si|no)+")]],
    posibilidadcambioresidencia:["",[Validators.required,Validators.maxLength(2),Validators.pattern("(si|no)+")]],
    estadoestudios:["",[Validators.required, ]],
    profesiones_idprofesiones:["",[Validators.required]],
    idiomas:["",[Validators.required]],
    nivelestudios_idnivelestudios:["",[Validators.required, ]],
    usuario_idusuario:null,
  })


  campoEsValido(campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }




 
  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/

    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
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

    this.getAspirantes();
    this.getNivelesEstudios();

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


  guardar(){

    let formData= new FormData();
    formData.append('numerohijos',this.miFormulario.controls['numerohijos'].value)
    formData.append('experiencialaboral',this.miFormulario.controls['experiencialaboral'].value)
    formData.append('campolaboral',this.miFormulario.controls['campolaboral'].value)
    formData.append('experticia',this.miFormulario.controls['experticia'].value)
    formData.append('aniosexperiencia',this.miFormulario.controls['aniosexperiencia'].value)
    formData.append('fechanacimiento',this.miFormulario.controls['fechanacimiento'].value)
    formData.append('videopresentacion',this.file)
    formData.append('posibilidadviajar',this.miFormulario.controls['posibilidadviajar'].value)
    formData.append('profesiones_idprofesiones',this.miFormulario.controls['profesiones_idprofesiones'].value)
    formData.append('usuario_idusuario',this.id)


    for(let asp of this.aspirantes){
      if(asp.usuario_idusuario==this.id){

        console.log(asp.idaspirante);
        this.http.put('http://localhost:8000/api/aspirantes/'+ asp.idaspirante, formData).subscribe(
          resp => console.log(resp),
          err => console.log(err)
    
        )
      }

    }

    
    alert('DATOS PROFESIONALES GUARDADOS');
    this.miFormulario.reset();
    
  
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
}
