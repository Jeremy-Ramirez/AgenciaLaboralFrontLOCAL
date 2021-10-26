import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {
  
  constructor(private httpClient:HttpClient) { 
    this.getTipodocumentos();
  }
  
  getTipodocumentos(){
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/tipodocumento/')
  }
}
