import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AspiranteService } from 'src/app/servicios/aspirante.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { SolicitudComponent } from '../solicitud/solicitud.component';

@Component({
  selector: 'app-solicitudes-contratacion',
  templateUrl: './solicitudes-contratacion.component.html',
  styleUrls: ['./solicitudes-contratacion.component.css']
})
export class SolicitudesContratacionComponent implements OnInit {

  aspirantes: any[]=[];
  solicitudes: any[]=[];
  representantes: any[]=[];
  usuarios: any[]=[];
  listaSolicitudes: any[]=[];
  listausuariosAspirantes2: any[]=[];
  columnas: string[] = ['cargo','descripcioncargo', 'fechainicio','fechacierre','boton', 'aceptar'];
  dataSource:any; 
  idSolicitud:any;
  //@ViewChild(MatTable) tabla1!: MatTable<any>;

  suscription: Subscription; 


  constructor(
    private aspiranteService: AspiranteService, 
    private fb: FormBuilder, 
    private http: HttpClient, 
    private rutaActiva: ActivatedRoute,
    private solicitudService: SolicitudService,
    private router: Router,
    
    public dialog: MatDialog,
    ) {
      
    
    }

  abrirDialogo(solicitud: any) {
    const dialogo1 = this.dialog.open(SolicitudComponent, {
      data: { solicitudIndividual: solicitud }
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.agregar(art);
    });
  }

  



  agregar(art: any) {
    this.listaSolicitudes.push();
    //this.tabla1.renderRows();
    this.dataSource.renderRows();
  }
  
  getRepresentantes(){
    this.http.get('http://localhost:8000/api/representantes/').subscribe((doc:any)=>{
      this.representantes=doc
        console.log(this.representantes)

    })
  }

  getSolicitudes(){
    this.solicitudService.getSolicitud().subscribe((solicitudes:any)=>{
      this.solicitudes=solicitudes
        console.log("SOLICS",this.solicitudes)

    })
  }

  
  getUsuarios(){
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios =doc
      console.log("USUARIOS",this.usuarios)
      /*doc.forEach(user => {
        this.representantes.forEach(rep=>{
          console.log("usuario",user.idusuario)
          console.log("representante",rep.usuario_idusuario)
          if(user.idusuario===rep.usuario_idusuario){
            this.aspirantesNuevos.push(user)
            console.log(this.aspirantesNuevos)
          }
        })
      });*/






    })
  }

  solicitudesLista(){
    for( let rep of this.representantes){
      for(let sol of this.solicitudes){
        if(rep.idrepresentanteempresa==sol.representante_idrepresentante){
          //if (rep.rol_idrol==2 && sol.representante_idrepresentante == 2){
            //this.listausuariosAspirantes.push(user)
            this.listaSolicitudes.indexOf(sol) === -1 ? this.listaSolicitudes.push(sol):
            console.log("This item already exists");
            console.log("solicitudes que quedan",this.listaSolicitudes)
          
          
        //}
          /*if(user.rol_idrol==2 && asp.estadoaspirantes_idestadoaspirantes == 1){
            const index= this.listausuariosAspirantes.indexOf(user);
            this.listausuariosAspirantes.indexOf(user) > -1 ? this.listausuariosAspirantes.splice(index,1):
            console.log("Borrado prov");
            console.log("usuarios que quedan",this.listausuariosAspirantes)
          }*/
        }
        if(rep.idrepresentanteempresa!=sol.representante_idrepresentante){
          const index= this.listaSolicitudes.indexOf(sol);
          this.listaSolicitudes.indexOf(sol) > -1 ? this.listaSolicitudes.splice(index,1):
          console.log("Borrado prov");
          console.log("solicitudes que quedan",this.listaSolicitudes)
        }
      }
    } 
  }


  /*usuariosAspirantesAceptados(){
    this.listaSolicitudes=[]
    for( let user of this.usuarios){
      for(let asp of this.aspirantes){
        if(user.idusuario==asp.usuario_idusuario){
          if (user.rol_idrol==2 && asp.estadoaspirantes_idestadoaspirantes == 2){
            //this.listausuariosAspirantes.push(user)
            this.listaSolicitudes.indexOf(user) === -1 ? this.listaSolicitudes.push(user):
            console.log("This item already exists");
            console.log("usuarios que quedan",this.listaSolicitudes)
          
          
      }
        }
      }
    } 
  }*/

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
      
      console.log(this.aspirantes)

    })
    this.getRepresentantes();
    this.getUsuarios();
    this.getSolicitudes();
    //this.getRepresentantes();
    //console.log("repsonini",this.representantes)
    //this.getUsuarios();
    
    //console.log("useronini",this.usuarios)

    //this.getSolicitudes();
    //console.log("SOLICSonini",this.solicitudes)

    setTimeout(()=>{
      this.solicitudesLista();
      setTimeout(()=>{
        this.dataSource = new MatTableDataSource(this.listaSolicitudes);
  
      }, 300);

    }, 500);

    this.suscription = this.solicitudService.refresh$.subscribe(()=>{
      this.reloadComponent();
      



      /*this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
      
      console.log("ASPIRANTES",this.aspirantes)

      })
      this.getAspirantesNuevos()

      
      setTimeout(()=>{
        this.usuariosAspirantes();
        console.log("a")

        setTimeout(()=>{
          
          //let data= new MatTableDataSource(this.listausuariosAspirantes);
          //this.dataSource.data = this.listausuariosAspirantes
          this.ngOnInit()
    
        }, 300);
  
      }, 300);*/

    })

  }

  ngOnDestroy():void{
    this.suscription.unsubscribe();
    console.log('Observable cerrado');
  }

  miFormulario: FormGroup = this.fb.group({
    estadoaspirantes_idestadoaspirantes: 2,
    

  })



  aceptarAspirante(id : any){
    for(let asp of this.aspirantes){
      if(asp.usuario_idusuario==id){
        let headers = new HttpHeaders();
        let formData= new FormData();
        formData.append("estadoaspirantes_idestadoaspirantes", '1')
        console.log(asp.idaspirante)
        headers.append('Content-Type', 'application/json');

        this.aspiranteService.patchAspirante(asp.idaspirante,formData).subscribe(data=>{
          console.log("Datos del post",data)
          //this.ngOnInit()
          //this.listausuariosAspirantes2 = this.listausuariosAspirantes
          alert('ASPIRANTE ACEPTADO');
          //this.miFormulario.reset();
        });

      }
    }
  }

  eliminarSolicitud(event: Event){
    if(confirm("¿Seguro desea eliminar esta solicitud?")){
      for(let solicitud of this.listaSolicitudes){
        if(solicitud.idsolicitud==event){
          //this.solicitudes.splice(this.listaSolicitudes.findIndex(item=> item.idsolicitud === event),1)
          this.solicitudService.deleteSolicitud(
            event).subscribe(data=>{
              console.log("Datos del post",data)
              alert('Solicitud Borrada')
              
            });
        }

      }
    }

  }

  

}
