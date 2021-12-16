import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AspiranteService } from 'src/app/servicios/aspirante.service';
import { VistaPerfilAspiranteComponent } from '../vista-perfil-aspirante/vista-perfil-aspirante.component';

@Component({
  selector: 'app-aspirantes-nuevos',
  templateUrl: './aspirantes-nuevos.component.html',
  styleUrls: ['./aspirantes-nuevos.component.css']
})
export class AspirantesNuevosComponent implements OnInit {

  aspirantes: any[]=[];
  aspirantesNuevos: any[]=[];
  representantes: any[]=[];
  usuarios: any[]=[];
  listausuariosAspirantes: any[]=[];
  listausuariosAspirantes2: any[]=[];
  columnas: string[] = ['nombreusuario','nombre', 'apellido','nodocumento', 'correo','boton', 'aceptar'];
  dataSource:any; 

  suscription: Subscription; 


  constructor(
    private aspiranteService: AspiranteService, 
    private fb: FormBuilder, 
    private http: HttpClient, 
    private rutaActiva: ActivatedRoute,
    public dialog: MatDialog) {
    this.getRepresentantes()
    this.getAspirantesNuevos();
  }


  abrirDialogo(aspirante: any) {
    const dialogo1 = this.dialog.open(VistaPerfilAspiranteComponent, {
      data: { aspiranteIndividual: aspirante }, 
      height: '800px',
      width: '1000px',
      
    });

    dialogo1.afterClosed().subscribe(art => {
      if (art != undefined)
        this.agregar(art);
    });
  }

  agregar(art: any) {
    this.listausuariosAspirantes.push();
    //this.tabla1.renderRows();
    this.dataSource.renderRows();
  }
  
  getRepresentantes(){
    this.http.get('http://localhost:8000/api/representantes/').subscribe((doc:any)=>{
      this.representantes=doc
        console.log(this.representantes)

    })
  }

  getAspirantesNuevos(){
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

  usuariosAspirantes(){
    for( let user of this.usuarios){
      for(let asp of this.aspirantes){
        if(user.idusuario==asp.usuario_idusuario){
          if (user.rol_idrol==2 && asp.estadoaspirantes_idestadoaspirantes == 2){
            //this.listausuariosAspirantes.push(user)
            this.listausuariosAspirantes.indexOf(user) === -1 ? this.listausuariosAspirantes.push(user):
            console.log("This item already exists");
            console.log("usuarios que quedan",this.listausuariosAspirantes)
          
          
        }
          if(user.rol_idrol==2 && asp.estadoaspirantes_idestadoaspirantes == 1){
            const index= this.listausuariosAspirantes.indexOf(user);
            this.listausuariosAspirantes.indexOf(user) > -1 ? this.listausuariosAspirantes.splice(index,1):
            console.log("Borrado prov");
            console.log("usuarios que quedan",this.listausuariosAspirantes)
          }
        }
      }
    } 
  }


  usuariosAspirantesAceptados(){
    this.listausuariosAspirantes=[]
    for( let user of this.usuarios){
      for(let asp of this.aspirantes){
        if(user.idusuario==asp.usuario_idusuario){
          if (user.rol_idrol==2 && asp.estadoaspirantes_idestadoaspirantes == 2){
            //this.listausuariosAspirantes.push(user)
            this.listausuariosAspirantes.indexOf(user) === -1 ? this.listausuariosAspirantes.push(user):
            console.log("This item already exists");
            console.log("usuarios que quedan",this.listausuariosAspirantes)
          
          
      }
        }
      }
    } 
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
      
      console.log(this.aspirantes)

    })

    setTimeout(()=>{
      this.usuariosAspirantes();
      setTimeout(()=>{
        this.dataSource = new MatTableDataSource(this.listausuariosAspirantes);
  
      }, 300);

    }, 500);

    this.suscription = this.aspiranteService.refresh$.subscribe(()=>{
      this.ngOnInit()



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

    if(confirm("¿Está seguro de que desea aceptar este aspirante?")){
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
  
          
  
  
          /*this.http.patch<any>("http://localhost:8000/api/aspirantes/"+asp.idaspirante,formData,{headers: headers}).subscribe(
            resp => console.log(resp),
            err => console.log(err)
              );*/
              
          
  
        }
      }
    }
    
  }
 

}
