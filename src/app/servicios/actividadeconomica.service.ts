import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActividadeconomicaService {

  constructor(private httpClient:HttpClient) { 
    this.getActividadeconomicas();
  }
  
  getActividadeconomicas(){
    return this.httpClient.get('http://localhost:8000/api/actividadeconomica/')
  }
}
