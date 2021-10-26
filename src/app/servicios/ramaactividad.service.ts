import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RamaactividadService {

  constructor(private httpClient:HttpClient) { 
    this.getRamaactividads();
  }
  
  getRamaactividads(){
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/ramaactividad/')
  }
}
