import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public _usuario: UsuarioService, public router: Router) { }

  formulario:FormGroup;

  ngOnInit() {
    init_plugins();
    this.formulario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, [Validators.required]),
      terminos: new FormControl(false),
    }, {validators: this.sonIguales('password', 'password2')});

    this.formulario.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      terminos: true
    });
  }

  sonIguales(campo1:string, campo2:string)
  {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2)
      {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  registrar()
  {
    if(this.formulario.invalid)
    {
      return;
    }

    if(!this.formulario.value.terminos)
    {
      swal("Importante", "Debe aceptar los terminos", "warning");
      console.log("");
      return;
    }
    
    let usuario = new Usuario(this.formulario.value.nombre, this.formulario.value.email, this.formulario.value.password);

    this._usuario.crearUsuario(usuario).subscribe(resp => this.router.navigate(['/login']));
  }

}
