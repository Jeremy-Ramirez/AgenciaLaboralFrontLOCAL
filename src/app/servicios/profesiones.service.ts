import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesionesService {

  private API_profesiones = "http://localhost:8000/api/profesiones/";

  constructor(private httpClient:HttpClient) {}

  

  getProfesiones() : Observable<any>{
    return this.httpClient.get(this.API_profesiones)
  }


  
}
