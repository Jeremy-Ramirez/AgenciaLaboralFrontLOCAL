import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaquetePagoService {

  private _refresh$ = new Subject<void>();
  private API_PaquetePago = "http://localhost:8000/api/paquetePago/";

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
  
  public getPaquetePago(): Observable<any>{
    return this.http.get(this.API_PaquetePago);

  }

  public postPaquetePago(paquete: any): Observable<any>{
    return this.http.post(this.API_PaquetePago, paquete)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  public deletePaquetePago(paquete: any): Observable<any>{
    return this.http.delete(this.API_PaquetePago+paquete)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  public patchPaquetePago(idPaquete: any, infoPaquete: any, headers: any): Observable<any>{
    return this.http.patch(this.API_PaquetePago+idPaquete, infoPaquete, headers)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    )
  }





  
}
