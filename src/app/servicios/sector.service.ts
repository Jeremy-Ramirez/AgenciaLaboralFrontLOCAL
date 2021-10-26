import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private httpClient:HttpClient) { 
    this.getSector();
  }
  
  getSector(){
    return this.httpClient.get('https://agencialaboralproyecto.pythonanywhere.com/api/sectores/')
  }
}
