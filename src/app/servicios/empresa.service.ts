import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient:HttpClient) { 
    this.getEmpresas();
  }
  
  getEmpresas(){
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/empresas/')
  }
  
  create(empresa) {    
    return this.httpClient.post('https://agencialaboralproyecto.pythonanywhere.com/api/empresas/', JSON.stringify(empresa));
  }

  loginEmpresa() {    
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/userempresa/', {withCredentials: true});
  }
  
  
}
