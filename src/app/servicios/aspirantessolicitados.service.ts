import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AspirantessolicitadosService {

  private _refresh$ = new Subject<void>();
  private API_aspirante = "http://localhost:8000/api/aspirantessolicitados/";

  constructor(private httpClient:HttpClient) { 
    this.getAspirantessolicitados();
  }
  get refresh$(){
    return this._refresh$;
  }
  public getAspirantessolicitados(){
    return this.httpClient.get(this.API_aspirante)
  }

  public patchAspiranteSolicitados(aspirante: any, cambio: any): Observable<any>{
    return this.httpClient.patch(this.API_aspirante+aspirante, cambio)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  
}
