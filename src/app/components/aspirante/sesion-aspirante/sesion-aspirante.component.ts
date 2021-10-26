import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-sesion-aspirante',
  templateUrl: './sesion-aspirante.component.html',
  styleUrls: ['./sesion-aspirante.component.css']
})
export class SesionAspiranteComponent implements OnInit {
  id='';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    /*this.http.get('http://localhost:8000/api/userusuario/', {withCredentials: true}).subscribe(
      (res: any) => {
        console.log("asd",res)
        Emitters.authEmitter.emit(true);
      },
      err => {
        Emitters.authEmitter.emit(false);
      }
    );*/
  }

}
