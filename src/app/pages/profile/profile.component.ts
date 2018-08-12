import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  imagenSubir:File;
  imagenTmp:string;

  constructor(public _usuario: UsuarioService) 
  {
    this.usuario = _usuario.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario:Usuario)
  {
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google)
    {
      this.usuario.email = usuario.email;
    }
    this._usuario.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(file:File)
  {
    if(!file)
    {
      this.imagenSubir = null;
      return;
    }

    if(file.type.indexOf('image') < 0)
    {
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = file;

    let reader = new FileReader();
    let urlImgTmp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imagenTmp = reader.result;
  }

  subirImagen()
  {
    this._usuario.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
