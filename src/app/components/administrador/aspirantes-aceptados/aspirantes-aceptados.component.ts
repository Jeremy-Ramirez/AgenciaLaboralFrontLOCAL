import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { VistaPerfilAspiranteComponent } from '../vista-perfil-aspirante/vista-perfil-aspirante.component';

@Component({
  selector: 'app-aspirantes-aceptados',
  templateUrl: './aspirantes-aceptados.component.html',
  styleUrls: ['./aspirantes-aceptados.component.css']
})
export class AspirantesAceptadosComponent implements OnInit {

  usuarios: any[]=[];
  aspirantes: any[]=[];
  listausuariosAspirantes: any[]=[];
  columnas: string[] = ['nombreusuario','nombre', 'apellido','nodocumento', 'correo','boton'];
  dataSource:any; 

  idAspirante: any;
  
  constructor( 
    private http: HttpClient, 
    private rutaActiva: ActivatedRoute,
    public dialog: MatDialog
    ) {
    this.getUsuarios();
    console.log("ASP", this.idAspirante)
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
  


  getUsuarios(){
    
  }

  ngOnInit(): void {

    
    setTimeout(()=>{
      this.usuariosAspirantes();
      setTimeout(()=>{
        this.dataSource = new MatTableDataSource(this.listausuariosAspirantes);
        //this.dataSource.paginator=this.paginator
  
      }, 100);

    }, 100);

    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc
      
      console.log(this.usuarios)

    })

    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
      
      console.log(this.aspirantes)

    })

  }


  usuariosAspirantes(){
    for( let user of this.usuarios){
      for(let asp of this.aspirantes){
        if(user.idusuario==asp.usuario_idusuario){
          if (user.rol_idrol==2 && asp.estadoaspirantes_idestadoaspirantes == 1){
            //this.listausuariosAspirantes.push(user)
            this.listausuariosAspirantes.indexOf(user) === -1 ? this.listausuariosAspirantes.push(user):
            console.log("This item already exists");
            console.log(this.listausuariosAspirantes)
          
          
      }
        }
      }
    } 
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  mostrar(id: any){
    console.log("NUEVOID",id)
    this.idAspirante=id,
    setTimeout(function(){ 
      document.getElementsByClassName("hey")[0].innerHTML=`<app-vista-perfil-aspirante [idAspirante]="${id}"></app-vista-perfil-aspirante>
    `
     }, 3000);
    
  }
}
