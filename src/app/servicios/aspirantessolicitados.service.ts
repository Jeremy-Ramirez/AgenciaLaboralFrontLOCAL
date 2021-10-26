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
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/aspirantessolicitados/')
  }
}
