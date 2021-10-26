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
    return this.httpClient.get('http://localhost:8000/api/empresas/')
  }
  
  create(empresa) {    
    return this.httpClient.post('http://localhost:8000/api/empresas/', JSON.stringify(empresa));
  }

  loginEmpresa() {    
    return this.httpClient.get('http://localhost:8000/api/userempresa/', {withCredentials: true});
  }
  
  
}
