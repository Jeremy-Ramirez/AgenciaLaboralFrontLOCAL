import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArchivosAspiranteService } from 'src/app/servicios/archivos-aspirante.service';

@Component({
  selector: 'app-vista-perfil-aspirante',
  templateUrl: './vista-perfil-aspirante.component.html',
  styleUrls: ['./vista-perfil-aspirante.component.css']
})
export class VistaPerfilAspiranteComponent implements OnInit, OnDestroy {
  @Input() idAspirante: any;
  //aspirantes:any[]=[];
  file:any;
  documento: any;
  aspirantes:any[]=[];
  usuarios:any[]=[];
  usuariosId:any;
  categoria:any[]=[];
  profesiones:any[]=[];
  archivos:any[]=[];
  id='';
  archivoValido:boolean =true;
  suscription: Subscription; 



  constructor(private http:HttpClient,private fb: FormBuilder,private rutaActiva: ActivatedRoute,
    private archivosAspiranteService: ArchivosAspiranteService) {
    //this.idAspirante=3;
    console.log("hereda",this.idAspirante)


   }
  

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )
    this.getAspirantes();
    this.getUsuarios();
    this.getCategoria();
    this.getUsuariosId();
    this.getArchivos();

    this.suscription = this.archivosAspiranteService.refresh$.subscribe(()=>{
      this.getArchivos();
    })
  }
  ngOnDestroy():void{
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }





  getAspirantes(){
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((resp:any)=>{
      this.aspirantes=resp;
      console.log(this.aspirantes)
    })
  }

  getUsuarios(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((resp:any)=>{
      this.usuarios=resp;
      console.log(this.usuarios)
    })
  }

  getUsuariosId(){
    this.http.get('http://localhost:8000/api/usuarios/'+ this.id).subscribe((resp:any)=>{
      this.usuariosId=resp;
      console.log(this.usuariosId)
    })
  }

  getArchivos(){
    this.archivosAspiranteService.getArchivosAspirante().subscribe(archivos=>{
      this.archivos=archivos;
      console.log(this.archivos)
    })
  }

  /*getAspirantes(){
    this.http.get('http://127.0.0.1:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
        console.log(this.aspirantes)
        this.aspirantes.forEach(element => {
          if(element.idaspirante=='16'){
            this.file=element.videopresentacion;
          }
        });

    })
  }*/

  




 
  miFormulario: FormGroup= this.fb.group({
    
    nombredocumento: ["", [Validators.required]],
    categoriaDocumento_idcategoriadocumento: ["", [Validators.required]],
    archivo:["",[Validators.required, Validators.pattern("^.*\.(pdf|docx)$")]],
    fechacreacion:["",[Validators.required]],
    aspirante_idaspirante:1,
    usuario_idusuario:1,

  })

  campoEsValido( campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  getCategoria(){
    this.http.get('http://localhost:8000/api/categoriadocumento/').subscribe((cat:any)=>{
      this.categoria = cat;
      console.log(this.categoria)
    })
  }


  handleFileInput(event: Event){

    

    if((<HTMLInputElement>event.target).files[0].size>2000000){
      this.archivoValido=false;
      //alert('El archivo supera los 6Mb.');
    }else{
      this.archivoValido=true;
      this.file=(<HTMLInputElement>event.target).files[0];
      console.log("archivo", this.file)
    }

  
 }

 subirArchivo(){

    for (let asp of this.aspirantes){
      if(asp.usuario_idusuario==this.id){

        let formData= new FormData();
        formData.append('nombredocumento',this.miFormulario.controls['nombredocumento'].value)
        formData.append('categoriaDocumento_idcategoriadocumento',this.miFormulario.controls['categoriaDocumento_idcategoriadocumento'].value)
        formData.append('fechacreacion',this.miFormulario.controls['fechacreacion'].value)
        formData.append('aspirante_idaspirante',asp.idaspirante)
        formData.append('usuario_idusuario',this.id)
        formData.append('archivo',this.file)
    
    
        console.log(this.miFormulario.value);
        this.archivosAspiranteService.postArchivosAspirante(
          formData).subscribe(data=>{
            console.log("Datos del post",data)
            alert('Archivo Guardado')
            this.miFormulario.reset();
          });
      }
    }

    
    
  
  }

 


  


}
