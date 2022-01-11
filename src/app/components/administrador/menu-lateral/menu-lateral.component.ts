import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Emitters } from '../clases/emitters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  aspirantesAceptados = false;
  sesionAspirante = false;
  authenticated = false;


  opened: boolean;

  lista={l1:false,l2:false,l3:false,l4:false,l5:false,l6:false,l7:false,l8:false,l9:false}
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {}
  
    ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        (auth: boolean) => {
          this.authenticated = auth;
        }
      );
    }
  
    logout(): void {
      this.http.post('http://localhost:8000/api/logoutusuario/', {}, {withCredentials: true})
        .subscribe(() => this.authenticated = false);
    }

  /*showAspirantesAceptados(): void {
    this.aspirantesAceptados = true;
    this.sesionAspirante = false;
  }
  showSesionAspirante(): void {
    this.sesionAspirante = true;
    this.aspirantesAceptados = false;
  }*/
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
