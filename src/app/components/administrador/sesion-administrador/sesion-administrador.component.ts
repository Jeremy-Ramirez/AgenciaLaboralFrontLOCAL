import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesion-administrador',
  templateUrl: './sesion-administrador.component.html',
  styleUrls: ['./sesion-administrador.component.css']
})
export class SesionAdministradorComponent implements OnInit {
  aspirantesAceptados = false;
  sesionAspirante = false;
  constructor() { }

  ngOnInit(): void {
  }

  showAspirantesAceptados(): void {
    this.aspirantesAceptados = true;
    this.sesionAspirante = false;
  }
  showSesionAspirante(): void {
    this.sesionAspirante = true;
    this.aspirantesAceptados = false;
  }

}