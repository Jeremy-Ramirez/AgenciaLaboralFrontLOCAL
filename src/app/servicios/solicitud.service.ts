import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private httpClient:HttpClient) { 
    this.getSolicitudes();
  }
  
  getSolicitudes(){
    return this.httpClient.get('http://localhost:8000/api/solicitudes/')
  }

  loginUsuario() {    
    return this.httpClient.get('http://localhost:8000/api/userusuario/', {withCredentials: true});
  }
}
