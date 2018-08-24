import { Injectable } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  public menu:any = [];

  constructor(public _usuario: UsuarioService) 
  {
    
  }

  cargarMenu()
  {
    this.menu = this._usuario.menu;
  }
}
