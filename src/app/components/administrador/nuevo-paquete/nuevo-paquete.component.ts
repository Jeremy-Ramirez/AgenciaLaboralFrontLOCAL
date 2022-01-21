import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Emitters } from '../clases/emitters';


import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-nuevo-paquete',
  templateUrl: './nuevo-paquete.component.html',
  styleUrls: ['./nuevo-paquete.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class NuevoPaqueteComponent implements OnInit {

  genero:any[]=[];
  tipoDocumento:any[]=[];
  provincia:any[]=[];
  ciudad:any[]=[];
  usuarios:any[]=[];
  estadoCivil: any[]=[];
  duracionPaquete: any[]=[];
  
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
    nombrepaquete: ["",[Validators.required]],
    descripcion:["",[Validators.required]],
    precio: ["",[Validators.required, Validators.pattern("^(?!.*e)[0-9]+((,|.)[0-9]+)?$")]],
    duracionpaquetes_idduracionpaquetes: ["",[Validators.required]],
    fecharegistro:["",[Validators.required]],
    fechacaducidad: ["",[Validators.required]],
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

  getDuracionPaquete(){
    this.http.get('http://localhost:8000/api/duracionpaquetes/').subscribe((duracionPaquete:any)=>{
      this.duracionPaquete=duracionPaquete;
      console.log(this.duracionPaquete)

      
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

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + (date.getDate())).slice(-2);
      console.log("CONVERSION",[date.getFullYear(), mnth, day].join("-"))
    return [date.getFullYear(), mnth, day].join("-");
  }

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
    this.miFormulario.get('fechacaducidad').setValue(this.convert(this.miFormulario.get('fechacaducidad').value));
    this.miFormulario.get('fecharegistro').setValue(this.convert( this.miFormulario.get('fecharegistro').value));

    //console.log(this.miFormulario.get('duracion').value)
    //this.miFormulario.get('duracion').setValue(this.establecerDuracion());
    
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
    //console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]
    let fechaActual2= this.convert(new Date((new Date()).valueOf()))
    let fechaForm=this.convert(new Date(this.miFormulario.controls['fecharegistro'].value+1))
    console.log("FECHAACTUAL",this.convert(new Date((new Date()).valueOf())))
    console.log("FECHA QUE MANDO", this.convert(new Date(this.miFormulario.controls['fecharegistro'].value+1)))
    if(fechaActual2<=fechaForm){
      this.fechaCorrectaInicio=true;
      
      console.log("entra")
    }else{
      this.fechaCorrectaInicio=false;

    }
    this.validarFechacierre()

  }


  validarFechacierre(){
    
    
    let fechaNacimiento=this.miFormulario.controls['fechacaducidad'].value
    console.log(fechaNacimiento, new Date().toISOString().split('T')[0])
    let fechaActual=new Date().toISOString().split('T')[0]  
    let fechaActual2= this.convert(new Date((new Date()).valueOf()))
    let fechaFormcaducidad=this.convert(new Date(this.miFormulario.controls['fechacaducidad'].value+1))
    let fechaFormregistro=this.convert(new Date(this.miFormulario.controls['fecharegistro'].value+1))
    if(fechaActual2<=fechaFormcaducidad && fechaFormregistro<=fechaFormcaducidad){
      this.fechaCorrectaCierre=true;
      
      console.log("entra")
    }
    else{
      this.fechaCorrectaCierre=false;

    }
    this.validarFechainicio()

  }


  


  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/
    this.getTipodocumento();
    this.getDuracionPaquete();



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
