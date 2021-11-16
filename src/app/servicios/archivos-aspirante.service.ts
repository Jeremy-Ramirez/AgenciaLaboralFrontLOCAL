import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchivosAspiranteService {

  private _refresh$ = new Subject<void>();
  private API_archivosAspirante = "http://localhost:8000/api/archivosaspirante/";

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
  
  public getArchivosAspirante(): Observable<any>{
    return this.http.get(this.API_archivosAspirante);

  }

  public postArchivosAspirante(archivo: any): Observable<any>{
    return this.http.post(this.API_archivosAspirante, archivo)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  public deleteArchivosAspirante(archivo: any): Observable<any>{
    return this.http.delete(this.API_archivosAspirante+archivo)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }



  
}
