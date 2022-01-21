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
import { VistaPerfilAspiranteComponent } from '../vista-perfil-aspirante/vista-perfil-aspirante.component';
import { AspirantessolicitadosService } from '../../../servicios/aspirantessolicitados.service';

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
  //, 'solicitudCompleta', 'fechainicio','fechacierre'
  columnas: string[] = ['cargo', 'aspirantesPorSolicitud', 'eliminar'];
  dataSource:any; 

  columnas2: string[] = ['nombre', 'apellido','perfil','aceptar','rechazar'];
  dataSource2:any; 


  columnas3: string[] = ['nombre', 'apellido','perfil','aceptar','rechazar'];
  dataSource3:any; 

  idSolicitud:any;
  //@ViewChild(MatTable) tabla1!: MatTable<any>;

  suscription: Subscription; 
  suscription2: Subscription; 


  aspirantessolicitados: any[]=[];
  aspirantesPorSolicitud: any[]=[];
  aspirantes2: any[]=[];
  aspirantesLista: any[]=[];
  usuarios2: any[]=[];
  usuariosLista: any[]=[];
  solicitudActual: any;


  aspirantessolicitados2: any[]=[];
  aspirantesPorSolicitud2: any[]=[];
  aspirantes3: any[]=[];
  aspirantesLista2: any[]=[];
  usuarios3: any[]=[];
  usuariosLista2: any[]=[];
  solicitudActual2: any;
  solicitudEvaluada: any;

  constructor(
    private aspiranteService: AspiranteService, 
    private fb: FormBuilder, 
    private http: HttpClient, 
    private rutaActiva: ActivatedRoute,
    private solicitudService: SolicitudService,
    private router: Router,
    private aspirantessolicitadosService: AspirantessolicitadosService,
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

  abrirPerfil(usuario: any) {
    let aspirante;
    for(let asp of this.aspirantes){
      if(usuario.idusuario==asp.usuario_idusuario){
        aspirante=asp;
    
      }

    }
    console.log("ASPIRANTE ENVIADO AL PERFIL", aspirante)
    /*const dialogo1 = this.dialog.open(VistaPerfilAspiranteComponent, {
      data: { aspiranteIndividual: usuario }
    });*/
    const dialogo1 = this.dialog.open(VistaPerfilAspiranteComponent, {
      data: { aspiranteIndividual: aspirante, usuarioIndividual: usuario}, 
     
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

  filtrar2(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filtro.trim().toLowerCase();
  } 

  filtrar3(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filtro.trim().toLowerCase();
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

    this.suscription2 = this.aspirantessolicitadosService.refresh$.subscribe(()=>{
      //this.reloadComponent();
      this.funciones(this.solicitudEvaluada);
    

    })

  }

  ngOnDestroy():void{
    this.suscription.unsubscribe();
    this.suscription2.unsubscribe();
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

  funciones(solicitud){
    this.verAspirantes(solicitud), 
    this.verAspirantesAceptados(solicitud)
  }

  


  verAspirantes(solicitud){
    this.solicitudActual=solicitud.cargo;
    this.aspirantesPorSolicitud=[];
    this.http.get('http://localhost:8000/api/aspirantessolicitados/').subscribe((doc:any)=>{
      this.aspirantessolicitados=doc;
      console.log(this.aspirantessolicitados)
      for(let aspsol of this.aspirantessolicitados){
        console.log("ASPSOL", aspsol.solicitud_idsolicitud)
        console.log("this.idsolicitud", solicitud.idsolicitud)
        if(aspsol.solicitud_idsolicitud == solicitud.idsolicitud && aspsol.estadoaspiranteempresa_idestadoaspiranteempresa=="3"){
          //this.aspirantesPorSolicitud.indexOf(aspsol) === -1? this.aspirantesPorSolicitud.push(aspsol):
          console.log("está")

          this.aspirantesPorSolicitud.push(aspsol);
        }

      }
      console.log("obtenerAspirantePorSolicitud", this.aspirantesPorSolicitud)

          setTimeout(()=>{
            this.obtenerAspirantes()

          }, 200);
    })
  }

  obtenerAspirantes(){
    this.aspirantesLista=[];
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes2=doc;
      console.log(this.aspirantes2)
      for(let aspsol of this.aspirantesPorSolicitud){
        for(let aspirante of this.aspirantes2){
          if(aspsol.aspirante_idaspirante == aspirante.idaspirante){
            this.aspirantesLista.indexOf(aspirante) === -1? this.aspirantesLista.push(aspirante):

            //this.aspirantesLista.push(aspirante);
            console.log("hay")
            
          }
        }
      }

      console.log("obteneraspirantes", this.aspirantesLista)
            setTimeout(()=>{
              this.obtenerUsuarios()

            }, 300);
    })
  }

  obtenerUsuarios(){
    this.usuariosLista=[];
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios2=doc;
      console.log(this.usuarios)
      if(this.aspirantesLista!=null){
        for(let aspirante of this.aspirantesLista){
          for(let usuario of this.usuarios2){
            if(aspirante.usuario_idusuario == usuario.idusuario){
              this.usuariosLista.indexOf(usuario) === -1? this.usuariosLista.push(usuario):
              console.log("This item already exists");
              console.log(usuario.nombre)
              //this.usuariosLista.push(usuario);
              
            }
          }
        }
        console.log("usuariosLista", this.usuariosLista)
        this.dataSource2 = new MatTableDataSource(this.usuariosLista);

      }
    })
  }



  //Tabla de Aceptados

  verAspirantesAceptados(solicitud){
    this.solicitudEvaluada=solicitud
    this.solicitudActual2=solicitud.cargo;
    this.aspirantesPorSolicitud2=[];
    this.http.get('http://localhost:8000/api/aspirantessolicitados/').subscribe((doc:any)=>{
      this.aspirantessolicitados2=doc;
      console.log(this.aspirantessolicitados2)
      for(let aspsol of this.aspirantessolicitados2){
        console.log("ASPSOL", aspsol.solicitud_idsolicitud)
        console.log("this.idsolicitud", solicitud.idsolicitud)
        if(aspsol.solicitud_idsolicitud == solicitud.idsolicitud && aspsol.estadoaspiranteempresa_idestadoaspiranteempresa=="1"){
          //this.aspirantesPorSolicitud.indexOf(aspsol) === -1? this.aspirantesPorSolicitud.push(aspsol):
          console.log("está")

          this.aspirantesPorSolicitud2.push(aspsol);
        }

      }
      console.log("obtenerAspirantePorSolicitud", this.aspirantesPorSolicitud2)

          setTimeout(()=>{
            this.obtenerAspirantesAceptados()

          }, 200);
    })
  }

  obtenerAspirantesAceptados(){
    this.aspirantesLista2=[];
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes3=doc;
      console.log(this.aspirantes3)
      for(let aspsol of this.aspirantesPorSolicitud2){
        for(let aspirante of this.aspirantes3){
          if(aspsol.aspirante_idaspirante == aspirante.idaspirante){
            this.aspirantesLista2.indexOf(aspirante) === -1? this.aspirantesLista2.push(aspirante):

            //this.aspirantesLista.push(aspirante);
            console.log("hay")
            
          }
        }
      }

      console.log("obteneraspirantes", this.aspirantesLista2)
            setTimeout(()=>{
              this.obtenerUsuariosAceptados()

            }, 300);
    })
  }

  obtenerUsuariosAceptados(){
    this.usuariosLista2=[];
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios3=doc;
      console.log(this.usuarios3)
      if(this.aspirantesLista2!=null){
        for(let aspirante of this.aspirantesLista2){
          for(let usuario of this.usuarios3){
            if(aspirante.usuario_idusuario == usuario.idusuario){
              this.usuariosLista2.indexOf(usuario) === -1? this.usuariosLista2.push(usuario):
              console.log("This item already exists");
              console.log(usuario.nombre)
              //this.usuariosLista.push(usuario);
              
            }
          }
        }
        console.log("usuariosLista2", this.usuariosLista2)
        this.dataSource3 = new MatTableDataSource(this.usuariosLista2);

      }
    })
  }

  

  acceptAspirantesSolicitados(usuario){
    console.log("ACEPTASS")
    let formData= new FormData();
    formData.append("estadoaspiranteempresa_idestadoaspiranteempresa", '1')
    for(let asp of this.aspirantes3){
      //console.log(asp)
          if(asp.usuario_idusuario==usuario.idusuario){
            console.log(asp.usuario_idusuario)
            console.log(usuario.idusuario)
            for(let solActual of this.aspirantessolicitados){
              //console.log(this.solicitudActual2.idsolicitud)
              //console.log(solActual)
                    if(solActual.solicitud_idsolicitud==this.solicitudEvaluada.idsolicitud && solActual.aspirante_idaspirante==asp.idaspirante){
                      console.log("PATCH",solActual)
                      this.aspirantessolicitadosService.patchAspiranteSolicitados(solActual.idaspirantessolicitados,formData).subscribe(data=>{
                        console.log("Datos del post",data)
                        //this.ngOnInit()
                        //this.listausuariosAspirantes2 = this.listausuariosAspirantes
                        alert('ASPIRANTE ACEPTADO');
                        //this.miFormulario.reset();
                      });
                    }
              }
            }
          }
    }

    
    

  

}
