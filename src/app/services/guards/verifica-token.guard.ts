import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuario: UsuarioService)
  {
    
  }

  canActivate(): Promise<boolean> | boolean {
    console.log("Inicio de verifica token guard");
    let token = this._usuario.token;
    let payload = JSON.parse(atob(token.split(".")[1]));
    let expirado = this.expirado(payload.exp);
    if(expirado)
    {
      this._usuario.logout();
      return false;
    }
    
    return true;//this.verificaRenueva(payload.exp);
  }

  // verificaRenueva(exp:number):Promise<boolean>
  // { 
  //   return new Promise((resolve, reject) => {
  //     let tokenExp = new Date(exp * 1000);
  //     let now = new Date();
  //     now.setTime(now.getTime() + (1*60*60*1000));
  //     if(tokenExp.getTime() > now.getTime())
  //     {
  //       resolve(true);
  //     }
  //     else
  //     {
  //       this._usuario.renovarToken().subscribe(
  //         () => {
  //           resolve(true);
  //         },
  //         () => {
  //           this._usuario.logout();
  //           reject(false);
  //         }
  //       );
  //     }
  //   });
  // }

  expirado(exp:number)
  {
    let now = new Date().getTime() / 1000;

    if(exp < now)
    {
      return true;
    }
    return false;
  }
}
