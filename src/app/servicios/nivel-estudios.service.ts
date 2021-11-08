import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NivelEstudiosService {

  constructor(private httpClient:HttpClient) {
    this.getProfesiones();

   }


  getProfesiones(){
    return this.httpClient.get('http://localhost:8000/api/nivelestudios/')
  }
}
