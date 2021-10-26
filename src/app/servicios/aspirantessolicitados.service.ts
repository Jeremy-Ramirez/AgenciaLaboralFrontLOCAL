import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AspirantessolicitadosService {

  constructor(private httpClient:HttpClient) { 
    this.getAspirantessolicitados();
  }
  
  getAspirantessolicitados(){
    return this.httpClient.get('http://localhost:8000/api/aspirantessolicitados/')
  }
}
