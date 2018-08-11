import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame:boolean = false;
  email:string;
  auth2:any;
  constructor(public router:Router, public _usuario: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 0)
    {
      this.recuerdame = true;
    }
  }

  googleInit()
  {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '392959464286-2vv5n1br8ln1dn7lk5g34ohr15qf1nbe.apps.googleusercontent.com',
        scope: 'profile email',
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element)
  {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuario.loginGoogle(token).subscribe(response => window.location.href = '#/dashboard');
    });
  }

  ingresar(form:NgForm)
  {
    if(form.invalid)
      return;
  
    console.log(form.value);
    
    let usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuario.login(usuario, form.value.recuerdame).subscribe(loginExito => this.router.navigate(['/dashboard']));
    // ;
  }

}
