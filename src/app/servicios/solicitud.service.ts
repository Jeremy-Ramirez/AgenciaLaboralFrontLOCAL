import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private _refresh$ = new Subject<void>();
  private API_solicitudes = "http://localhost:8000/api/solicitudes/";


  constructor(private httpClient:HttpClient) { 
    this.getSolicitudes();
  }

  get refresh$(){
    return this._refresh$;
  }
  
  
  
  getSolicitudes(){
    return this.httpClient.get(this.API_solicitudes)
  }

  getSolicitudesPorId(id: any){
    return this.httpClient.get(this.API_solicitudes+`${id}`)
  }

  public getSolicitud(): Observable<any>{
    return this.httpClient.get(this.API_solicitudes)

  }

  public postSolicitudes(solicitud: any): Observable<any>{
    return this.httpClient.post(this.API_solicitudes, solicitud)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  public deleteSolicitud(solicitud: any): Observable<any>{
    return this.httpClient.delete(this.API_solicitudes+solicitud)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }
}
