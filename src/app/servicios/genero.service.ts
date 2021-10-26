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
    return this.httpClient.get('http://localhost:8000/api/genero/')
  }
}
