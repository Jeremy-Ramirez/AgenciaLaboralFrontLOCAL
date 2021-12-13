import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  aspiranteId:any;
  categoria:any[]=[];
  profesiones:any[]=[];
  archivos:any[]=[];
  id: any;
  archivoValido:boolean =true;
  suscription: Subscription; 

  loading: boolean;
  date = new Date();
  dd = String(this.date.getDate()).padStart(2, '0');
  mm = String(this.date.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = this.date.getFullYear();


  constructor(
    private http:HttpClient,
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private archivosAspiranteService: ArchivosAspiranteService,
    public dialogRef: MatDialogRef<VistaPerfilAspiranteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {aspiranteIndividual: any},) {
    //this.idAspirante=3;
    console.log("hereda",this.idAspirante)
    this.loading=false;


   }

  cancelar() {
    this.dialogRef.close();
  }
  

  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/
    this.id=this.data.aspiranteIndividual.idusuario
    console.log("ID DE LA DATAAAAA",this.id)
    this.getAspirantes();
    this.getUsuarios();
    this.getCategoria();
    this.getUsuariosId();
    this.getArchivos();
    this.getAspiranteporId();

    this.suscription = this.archivosAspiranteService.refresh$.subscribe(()=>{
      this.getArchivos();
    })
  }
  ngOnDestroy():void{
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }


  getAspiranteporId(){
    for(let asp of this.aspirantes){
      if(this.usuariosId.idusuario==asp.usuario_idusuario){
        this.aspiranteId=asp;
        console.log("ASPIRANTEID")
        console.log("ASPIRANTEID", this.aspiranteId)

      }

    }
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
      this.getAspiranteporId();
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
    fechacreacion:[""],
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
        formData.append('fechacreacion', this.yyyy + '-' + this.mm + '-' + this.dd)
        formData.append('aspirante_idaspirante',asp.idaspirante)
        formData.append('usuario_idusuario',this.id)
        formData.append('archivo',this.file)
    
    
        console.log(this.miFormulario.value);
        this.archivosAspiranteService.postArchivosAspirante(
          formData).subscribe(data=>{
            this.loading=true;
            console.log("Datos del post",data)
            alert('Archivo Guardado')
            this.loading=false;
            this.miFormulario.reset();
          });
      }
    }

    
    
  
  }

  eliminarArchivo(event: Event){
    if(confirm("¿Seguro desea eliminar el archivo?")){
      for(let doc of this.archivos){
        if(doc.idarchivosaspirante == event){
          this.archivos.splice(this.archivos.findIndex(item=> item.idarchivosaspirante === event),1)
          this.archivosAspiranteService.deleteArchivosAspirante(
            event).subscribe(data=>{
              
              alert('Archivo Borrado')
              
            });
        }
      }
    }
  }



  

 


  


}
