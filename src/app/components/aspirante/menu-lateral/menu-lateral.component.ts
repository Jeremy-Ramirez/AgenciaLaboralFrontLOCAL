import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emitters } from '../clases/emitters';

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

  opened: boolean;

  lista={l1:false,l2:false,l3:false,l4:false,l5:false,l6:false,l7:false,l8:false,l9:false}

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

  changeCategory(el,event){
    this.lista.l1=false;
    this.lista.l2=false;
    this.lista.l3=false;
    this.lista.l4=false;
    this.lista.l5=false;
    this.lista.l6=false;
    this.lista.l7=false;
    this.lista.l8=false;
    this.lista.l9=false;
    this.lista[event]=!this.lista[event];
  }
}
