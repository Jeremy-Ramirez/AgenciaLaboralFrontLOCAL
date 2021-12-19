import { HttpClient, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Emitters } from '../clases/emitters';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { NuevoPaqueteComponent } from '../nuevo-paquete/nuevo-paquete.component';
import { Subscription } from 'rxjs';
import { PaquetePagoService } from '../../../servicios/paquete-pago.service';


@Component({
  selector: 'app-paquete-pago',
  templateUrl: './paquete-pago.component.html',
  styleUrls: ['./paquete-pago.component.css']
})
export class PaquetePagoComponent implements OnInit {

  paquetes: any[]=[];
  suscription: Subscription;
  duracionHoras:any;
  duracionMeses:any;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    private paquetePagoService: PaquetePagoService,

    
  ) { }

  abrirDialogo() {
    const dialogo1 = this.dialog.open(NuevoPaqueteComponent, {
      data: {}, 
      height: '800px',
      width: '1000px',
      
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.agregar(art);
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  agregar(art: any) {
    //this.listausuariosAspirantes.push();
    //this.tabla1.renderRows();
    //this.dataSource.renderRows();
  }

  

  getPaquetePago(){
    this.http.get('http://localhost:8000/api/paquetePago/').subscribe((doc:any)=>{
      this.paquetes=doc;
      console.log(this.paquetes)
      this.convertirDuracion()
      
    })
    
  }

  convertirDuracion(){
    for(let paquete of this.paquetes){
      let duracion = paquete.duracion;
      if(duracion.split(' ')[0]=='30'){
        paquete.duracion= "1 Mes"
      }
      if(duracion.split(' ')[0]=='60'){
        paquete.duracion= "2 Meses"
      }
      if(duracion.split(' ')[0]=='90'){
        paquete.duracion= "3 Meses"
      }
      if(duracion.split(' ')[0]=='180'){
        paquete.duracion= "6 Meses"
      }
      
      //console.log(this.paquetes)
      //this.duracionHoras= duracion.split(' ')[1]+ " Horas"
    }
    
  }

  ngOnInit(): void {
    this.getPaquetePago();
    this.suscription = this.paquetePagoService.refresh$.subscribe(()=>{
      this.ngOnInit()


    })
  }
  ngOnDestroy():void{
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }


  eliminarPaquete(event: Event){
    if(confirm('¿Seguro desea eliminar este paquete de pago?')){
      for(let paquete of this.paquetes){
        if(paquete.idpaquetepago==event){
          this.paquetes.splice(this.paquetes.indexOf(item => item.idpaquetepago === event),1)
          /*this.http.delete('http://localhost:8000/api/paquetePago/'+event).subscribe((doc:any)=>{
            alert("Paquete de pago eliminado")
           })*/
          this.paquetePagoService.deletePaquetePago(event).subscribe((doc:any)=>{
            alert("Paquete de pago eliminado")
           })
        }

      }
    }
  }
  

}
