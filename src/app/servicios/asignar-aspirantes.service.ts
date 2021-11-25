import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignarAspirantesService {

  private API = "http://localhost:8000/api/";
  aspirantes : any[] = [];
  aspirantesSeleccionados : any[] = [];
  getProfesiones() : Observable<any>{
    return this.httpClient.get(this.API + 'profesiones/')
  }

  constructor(private httpClient:HttpClient) {}

  getAspirantes()  : Observable<any> {
    return this.httpClient.get(this.API + 'aspirantes/')
  }

  getUsuarios()  : Observable<any> {
    return this.httpClient.get(this.API + 'usuarios/')
  }

  getProvincias()  : Observable<any> {
    return this.httpClient.get(this.API + 'provincias/')
  }

  getCiudades()  : Observable<any> {
    return this.httpClient.get(this.API + 'ciudades/')
  }

  getNivelEstudios()  : Observable<any> {
    return this.httpClient.get(this.API + 'nivelestudios/')
  }

 

  

  

}
