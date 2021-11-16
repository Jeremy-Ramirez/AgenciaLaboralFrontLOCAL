import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {

  constructor(private httpClient:HttpClient) { 
    this.getEstadoCivil();
  }
  
  getEstadoCivil(){
    return this.httpClient.get('http://localhost:8000/api/estadocivils/');
  }
}
