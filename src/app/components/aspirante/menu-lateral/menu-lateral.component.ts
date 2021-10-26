import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  authenticated = false;

  id:any;
  usuarioActual:any;
  authToken: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private rutaActiva: ActivatedRoute,private http: HttpClient) {}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      },
      this.getUsuarioActual()

    );
    /*this.rutaActiva.params.subscribe(
      (params:  Params) => {
        this.id = params.id;
      }
    )*/

    //this.getNombre();
  }
  getUsuarioActual(){
    console.log(this.usuarioActual)

    this.http.get('http://localhost:8000/api/userusuario/',{ withCredentials: true}).subscribe(
      
    
      (res: any) => {
        console.log(res)
      
        //this.usuarioActual=res;
        this.id=res.idusuario;
        //console.log("USERR",this.usuarioActual)
        Emitters.authEmitter.emit(true);
      },
      err => {
        //this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
      }
    
    
   
    
    
    )
  }
  
  logout(): void {
    this.http.post('http://localhost:8000/api/logoutusuario/', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }
}
