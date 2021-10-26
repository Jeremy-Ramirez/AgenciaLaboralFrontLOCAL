import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-revisar-sugerencias',
  templateUrl: './revisar-sugerencias.component.html',
  styleUrls: ['./revisar-sugerencias.component.css']
})
export class RevisarSugerenciasComponent implements OnInit {

  sugerencias: any[] = [];

  usuarios: any[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/usuarios/').subscribe((doc:any)=>{
      this.usuarios=doc
      
      console.log(this.usuarios)

    })

    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/sugerencias/').subscribe((doc:any)=>{
      this.sugerencias=doc
        console.log(this.sugerencias)
        
    })
  }


 
  

}
