import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Emitters } from '../clases/emitters';


@Component({
  selector: 'app-nuevo-paquete',
  templateUrl: './nuevo-paquete.component.html',
  styleUrls: ['./nuevo-paquete.component.css']
})
export class NuevoPaqueteComponent implements OnInit {

  genero:any[]=[];
  tipoDocumento:any[]=[];
  provincia:any[]=[];
  ciudad:any[]=[];
  usuarios:any[]=[];
  estadoCivil: any[]=[];

  correo:any='';
  id:'';
  message = '';
  duracionMes: any;
  usuarioActual: any;
  hide: boolean = true;

  seleccionado:string;
  seleccionuser:string;
  nombredoc:any;
  

  miFormulario: FormGroup = this.fb.group({
    nombrepaquete: [""],
    descripcion:[""],
    precio: [""],
    duracion: [""],
    fecharegistro:[""],
    fechacaducidad: [""],
    usuario_idusuario: '',
    estado_idestado:1,
    //confirmacion:["", [Validators.required]],

  })
  fechaCorrectaInicio: boolean=true;
  fechaCorrectaCierre: boolean=true;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private rutaActiva: ActivatedRoute,
    public dialogRef: MatDialogRef<NuevoPaqueteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {aspiranteIndividual: any},
    ) {
    //this.getUsuarios();
    

    
  }
  
  campoEsValido( campo: string){
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  cancelar() {
    this.dialogRef.close();
  }


  getTipodocumento(){
    this.http.get('http://localhost:8000/api/tipodocumento/').subscribe((doc:any)=>{
      this.tipoDocumento=doc;
      console.log(this.tipoDocumento)
      
    })
    
  }

 

  

  
  /*getUsuarios(){
    this.http.get('http://127.0.0.1:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc
      this.usuarios.forEach(element => {
        if(element.id===this.id){
            this.correo=element.correo;
        }
    })
  }*/
  establecerDuracion(){
    let dur= this.miFormulario.get('duracion').value;
    let valor='';
    if(dur=="0"){
      valor='30 00:00:00';
      return valor;
    }
    if(dur=="1"){
      valor='60 00:00:00';
      return valor;
    }
    if(dur=="2"){
      valor='90 00:00:00';
      return valor;
    }
    if(dur=="3"){
      valor='180 00:00:00';
      return valor;
    }
    return valor;
  }

  createPaquete(){
    console.log(this.miFormulario.value);
    this.miFormulario.get('usuario_idusuario').setValue(this.id);
    console.log(this.miFormulario.get('duracion').value)
    this.miFormulario.get('duracion').setValue(this.establecerDuracion());
    
    //let dur= this.miFormulario.get('duracion').value.split(' ')
    //console.log(dur[0])
    
    this.http.post('http://localhost:8000/api/paquetePago/', this.miFormulario.value).subscribe(
      resp => {
        console.log(resp)
        alert("Paquete creado")
        this.cancelar();
        this.reloadComponent()
        //this.router.navigate(['/administrador/sesionAdministrador/paquetePago'])
      },
      err => {
        console.log(err)
      }
    )
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  updatePaquete() {
    //this.correo=this.miFormulario.get("correo").value;
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.patch<any>("http://localhost:8000/api/paquetePago/"+this.id,this.miFormulario.value,{headers: headers}).subscribe(
      resp => console.log(resp),
      err => console.log(err)
        );
        
    alert('INFORMACIÓN ACTUALIZADA');

  }

  public register() {
    const user = this.miFormulario.value;
    console.log(user);
  }

  validarFechainicio(){
    
    let fechaNacimiento=this.miFormulario.controls['fecharegistro'].value
    console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]  
    

    if(fechaActual<=this.miFormulario.controls['fecharegistro'].value){
      this.fechaCorrectaInicio=true;
      
      console.log("entra")
    }else{
      this.fechaCorrectaInicio=false;

    }

  }


  validarFechacierre(){
    
    
    let fechaNacimiento=this.miFormulario.controls['fechacaducidad'].value
    console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]  
    

    if(fechaActual<=this.miFormulario.controls['fechacaducidad'].value){
      this.fechaCorrectaCierre=true;
      
      console.log("entra")
    }
    else{
      this.fechaCorrectaCierre=false;

    }

  }


  


  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/
    this.getTipodocumento();
    

    


    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        this.usuarioActual=res;
        /*for( let doc of this.tipoDocumento){
          console.log(doc.idtipodocumento)
          if(doc.idtipodocumento == this.usuarioActual.tipodocumento_idtipodocumento)
            this.nombredoc=  doc.descripcion;
        }*/
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );

    //this.getUsuarios();
  }
  show() {
    this.hide = !this.hide;
  }

}
