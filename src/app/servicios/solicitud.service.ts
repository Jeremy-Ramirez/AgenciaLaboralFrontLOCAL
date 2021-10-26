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
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/solicitudes/')
  }

  loginUsuario() {    
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/userusuario/', {withCredentials: true});
  }
}
