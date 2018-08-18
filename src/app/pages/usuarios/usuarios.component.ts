import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [];
  offset: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuario: UsuarioService, public _modalUpload: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUpload.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    })
  }

  mostrarModal(id:string)
  {
    this._modalUpload.mostrarModal('usuarios', id);
  }

  cargarUsuarios()
  {
    this.cargando = true;
    this._usuario.cargarUsuarios(this.offset).subscribe((response:any) => {
      this.cargando = false;
      this.totalRegistros = response.total;
      this.usuarios = response.usuarios;
    });
  }

  cambiarOffset(valor:number)
  {
    let offset = this.offset + valor;
    if(offset >= this.totalRegistros)
    {
      return;
    }
    if(offset < 0)
    {
      return;
    }
    this.offset = offset;
    this.cargarUsuarios();
  }

  buscarUsuarios(termino:string)
  {
    if(!termino)
    {
      this.cargarUsuarios();
      return;
    }
    
    this.cargando = true;
    this._usuario.buscarUsuarios(termino).subscribe((usuarios:Usuario[]) => {
      this.cargando = false;
      this.usuarios = usuarios;
    });
  }

  borrarUsuario(usuario: Usuario)
  {
    if(usuario._id === this._usuario.usuario._id)
    {
      swal("No puede borrar usuario", "No se puede borrar a si mismo", "error");
      return;
    }
    
    swal({
      title: "¿Esta seguro?",
      text: "Esta a punto de eliminar a "+ usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if(borrar)
      {
        this._usuario.borrarUsuario(usuario._id).subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario:Usuario)
  {
    this._usuario.actualizarUsuario(usuario).subscribe();
  }
}
