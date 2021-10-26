import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma:FormGroup;

  constructor(private fb:FormBuilder) {

    this.crearFormulario();

   }

  ngOnInit(): void {
  }


  crearFormulario(){
    this.forma=this.fb.group({

      usuario:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(6)]]

    })
  }

  get UsuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
  }
  get PasswordNoValido(){
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }


  guardar(){
  
    if(this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
    
    //Posteo de inf, a base de datos, a correo 
    console.log(this.forma.value);
    
    
    }


}
