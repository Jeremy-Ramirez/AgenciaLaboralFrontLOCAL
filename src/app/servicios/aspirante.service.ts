import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AspiranteService {

  private _refresh$ = new Subject<void>();
  private API_aspirante = "http://localhost:8000/api/aspirantes/";

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
  
  public getAspirante(): Observable<any>{
    return this.http.get(this.API_aspirante);

  }

  public postAspirante(aspirante: any): Observable<any>{
    return this.http.post(this.API_aspirante, aspirante)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  public patchAspirante(aspirante: any, cambio: any): Observable<any>{
    return this.http.patch(this.API_aspirante+aspirante, cambio)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }



  public deleteAspirante(aspirante: any): Observable<any>{
    return this.http.delete(this.API_aspirante+aspirante)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }
}
