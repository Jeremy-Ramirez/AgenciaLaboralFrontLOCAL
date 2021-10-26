import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private httpClient:HttpClient) { 
    this.getGeneros();
  }
  
  getGeneros(){
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/genero/')
  }
}
