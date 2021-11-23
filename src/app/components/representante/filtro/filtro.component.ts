import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  miFormulario: FormGroup= this.fb.group({
    provincia:['',Validators.required]
  })

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  solicitar(){
    console.log(this.miFormulario.value);
  }
}
