import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  private usuario:Usuario;

  constructor(public _usuario: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this._usuario.usuario;
  }

  buscar(query:string)
  {
    this.router.navigate(['/busqueda', query]);
  }
}
