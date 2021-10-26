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
    return this.httpClient.get('http://localhost:8000/api/ramaactividad/')
  }
}
