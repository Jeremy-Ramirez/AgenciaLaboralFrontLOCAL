import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {Emitters} from '../emitters/emitters';
import { map, shareReplay } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  authenticated = false;
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
    this.http.post('https://agencialaboralproyecto.pythonanywhere.com/api/logoutempresa/', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
  }

}
