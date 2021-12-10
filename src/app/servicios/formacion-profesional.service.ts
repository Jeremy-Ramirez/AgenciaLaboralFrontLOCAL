import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FormacionProfesionalService {

  private _refresh$ = new Subject<void>();
  private API_formacionprofesional = "http://localhost:8000/api/formacionprofesional/";

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }
  
  public getFormacionProfesional(): Observable<any>{
    return this.http.get(this.API_formacionprofesional);

  }

  public postFormacionProfesional(formacionprofesional: any): Observable<any>{
    return this.http.post(this.API_formacionprofesional, formacionprofesional)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }

  public deleteFormacionProfesional(formacionprofesional: any): Observable<any>{
    return this.http.delete(this.API_formacionprofesional+formacionprofesional)
    .pipe(
      tap(()=>{
        console.log("Entró a tap")
        this._refresh$.next();
      })
    );

  }
}
