import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../clases/emitters';
import { PaquetePagoService } from '../../../servicios/paquete-pago.service';

@Component({
  selector: 'app-editar-paquete',
  templateUrl: './editar-paquete.component.html',
  styleUrls: ['./editar-paquete.component.css']
})
export class EditarPaqueteComponent implements OnInit {

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

  //Guardar campos individuales
  botonGuardarNombre: boolean= false;
  botonGuardardescripcion: boolean= false;
  botonGuardarprecio: boolean= false;
  botonGuardarduracionpaquetes: boolean= false;
  botonGuardarfecharegistro: boolean= false;
  botonGuardarfechacaducidad: boolean= false;
  

  miFormulario: FormGroup = this.fb.group({
    nombrepaquete: ["",[Validators.required]],
    descripcion:["",[Validators.required]],
    precio: ["",[Validators.required, Validators.pattern("[0-9]+((,|.)[0-9]+)?")]],
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
    private paquetePagoService: PaquetePagoService,
    public dialogRef: MatDialogRef<EditarPaqueteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {Paquete: any},
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
      resp => {
        console.log(resp),
        alert('INFORMACIÓN ACTUALIZADA'),
        this.cancelar()
        this.reloadComponent()
      },
      err => {
        console.log(err)
      }
      
      );

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



  editarNombrePaquete(){
    this.miFormulario.controls['nombrepaquete'].enable();
    this.botonGuardarNombre =true
  }
  editarDescripcionPaquete(){
    this.miFormulario.controls['descripcion'].enable();
    this.botonGuardardescripcion =true
  }
  editarPrecioPaquete(){
    this.miFormulario.controls['precio'].enable();
    this.botonGuardarprecio =true
  }
  editarDuracionPaquete(){
    this.miFormulario.controls['duracionpaquetes_idduracionpaquetes'].enable();
    this.botonGuardarduracionpaquetes =true
  }
  editarfechaCreacionPaquete(){
    this.miFormulario.controls['fecharegistro'].enable();
    this.botonGuardarfecharegistro =true
  }
  editarfechaCaducidadPaquete(){
    this.miFormulario.controls['fechacaducidad'].enable();
    this.botonGuardarfechacaducidad =true
  }
  

  guardarPaquete(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let formData= new FormData();
    
    
    if(this.botonGuardarNombre){
      formData.append("nombrepaquete", this.miFormulario.get('nombrepaquete').value)
    }
    if(this.botonGuardardescripcion){
      formData.append("descripcion", this.miFormulario.get('descripcion').value)
    }
    if(this.botonGuardarprecio){
      formData.append("precio", this.miFormulario.get('precio').value)
    }
    if(this.botonGuardarduracionpaquetes){
      formData.append("duracionpaquetes_idduracionpaquetes", this.miFormulario.get('duracionpaquetes_idduracionpaquetes').value)
    }
    if(this.botonGuardarfecharegistro){
      formData.append("fecharegistro", this.miFormulario.get('fecharegistro').value)
    }
    if(this.botonGuardarfechacaducidad){
      formData.append("fechacaducidad", this.miFormulario.get('fechacaducidad').value)
    }
    
    
    
    
    
    this.paquetePagoService.patchPaquetePago(this.data.Paquete, formData,{headers: headers}).subscribe(
      resp => {
        console.log(resp),
        alert('INFORMACIÓN ACTUALIZADA')
        //this.cancelar()
        //this.reloadComponent()
      },
      err => {
        console.log(err)
      }
    );
        

    



    
  }



  


  ngOnInit(): void {
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/
    this.getTipodocumento();
    this.getDuracionPaquete();

    this.miFormulario.controls['nombrepaquete'].disable();
    this.miFormulario.controls['descripcion'].disable();
    this.miFormulario.controls['precio'].disable();
    this.miFormulario.controls['duracionpaquetes_idduracionpaquetes'].disable();
    this.miFormulario.controls['fecharegistro'].disable();
    this.miFormulario.controls['fechacaducidad'].disable();

    


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
