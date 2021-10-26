import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TipopersonaService {
  
  constructor(private http:HttpClient,private fb: FormBuilder) { 
    this.getTipopersonas();
  }
  
  getTipopersonas(){
    return this.http.get('https://agencialaboralproyecto.pythonanywhere.com/api/tipopersona/')
  }
}
