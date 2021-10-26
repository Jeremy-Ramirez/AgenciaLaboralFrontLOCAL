import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private httpClient:HttpClient) { 
    this.getCiudades();
  }
  
  getCiudades(){
    return this.httpClient.get('http://localhost:8000/api/ciudades/')
  }
}
