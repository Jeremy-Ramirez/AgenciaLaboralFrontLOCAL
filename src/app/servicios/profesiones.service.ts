import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesionesService {

  constructor(private httpClient:HttpClient) {
    this.getProfesiones();

   }


  getProfesiones(){
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/profesiones/')
  }
}
