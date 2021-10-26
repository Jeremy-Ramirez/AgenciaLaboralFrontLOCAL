import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Emitters} from '../emitters/emitters';
@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent implements OnInit {
  message = '';
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/userempresa/', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    );
  }

}
