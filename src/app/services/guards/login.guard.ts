import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public _usuario:UsuarioService, public router: Router)
  {

  }
  canActivate(): boolean {
    if(!this._usuario.estaLogueado())
    {
      this.router.navigate(['/login']);
    }
    return this._usuario.estaLogueado();
  }
}
