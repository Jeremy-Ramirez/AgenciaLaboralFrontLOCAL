import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-perfil-representante',
  templateUrl: './perfil-representante.component.html',
  styleUrls: ['./perfil-representante.component.css']
})
export class PerfilRepresentanteComponent implements OnInit {
  id='';
  message = '';
  usuarioActual: any;
  constructor(private http:HttpClient,private fb: FormBuilder,private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.idusuario}`;
        this.id=res.idusuario
        this.usuarioActual=res;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

}