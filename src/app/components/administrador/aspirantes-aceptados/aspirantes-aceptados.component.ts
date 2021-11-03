import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aspirantes-aceptados',
  templateUrl: './aspirantes-aceptados.component.html',
  styleUrls: ['./aspirantes-aceptados.component.css']
})
export class AspirantesAceptadosComponent implements OnInit {

  usuarios: any[]=[];
  aspirantes: any[]=[];
  
  idAspirante: any;
  
  constructor( private http: HttpClient, private rutaActiva: ActivatedRoute) {
    this.getUsuarios();
    console.log("ASP", this.idAspirante)
  }


  getUsuarios(){
    
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc
      
      console.log(this.usuarios)

    })

    this.http.get('http://localhost:8000/api/aspirantes/').subscribe((doc:any)=>{
      this.aspirantes=doc
      
      console.log(this.usuarios)

    })

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
