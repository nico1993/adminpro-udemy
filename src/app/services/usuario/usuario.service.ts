import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;
  menu: any = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService) 
  {
    this.getStorage();
  }

  renovarToken()
  {
    let url = `${URL_SERVICIOS}/login/renovartoken?token=${this.token}`;
    return this.http.get(url)
      .pipe(
        map((resp:any) => {
          this.token = resp.token;
          console.log("TOKEN RENOVADO", resp.token);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(resp => {
          this.router.navigate(['/login']);
          swal("No se pudo renovar token", "No fue posible renovar token", "error");
          return throwError(resp);
        })
      );
  }

  estaLogueado():boolean
  {
    return (this.token.length > 0) ? true : false;
  }

  getStorage()
  {
    if(localStorage.getItem('token'))
    {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }
    else
    {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id:string, token:string, usuario:Usuario, menu: any)
  {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token:string)
  {
    let url = `${URL_SERVICIOS}/login/google`;
    return this.http.post(url, {token}).pipe(map((response:any) => {
      this.guardarStorage('', response.token, response.usuario, response.menu);
      return true;
    }));
  }

  login(usuario:Usuario, recordar:boolean = false)
  {
    if(recordar)
    {
      localStorage.setItem('email', usuario.email);
    }
    else
    {
      localStorage.removeItem('email');
    }

    let url = `${URL_SERVICIOS}/login`;
    return this.http.post(url, usuario).pipe(
      map((response:any) => {
        this.guardarStorage('', response.token, response.usuario, response.menu);
        return true;
      }),
      catchError(err => {
        swal("Error en el login", err.error.mensaje, "error");
        return throwError(err);
      })
    );
  }

  logout()
  {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(["/login"]);
  }

  crearUsuario(usuario:Usuario)
  {
    let url = `${URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario).pipe(
      map((resp:any) => {
        swal("Usuario creado", usuario.email, "success");
        return resp.usuario;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, "error");
        return throwError(err);
      })
    );
  }

  actualizarUsuario(usuario:Usuario)
  {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;

    url += "?token=" + this.token;

    return this.http.put(url, usuario)
    .pipe(
      map((resp:any) => {
        if(usuario._id === this.usuario._id)
        {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }
        swal("Usuario actualizado", usuario.nombre, 'success');
        return true;
      }),
      catchError(err => {
        swal(err.error.mensaje, err.error.errors.message, "error");
        return throwError(err);
      })
    );
  }

  cambiarImagen(file:File, id: string)
  {
    this._subirArchivo.subirArchivo(file, 'usuarios', id)
      .then((resp:any) => {
        this.usuario.img = resp.usuarioActualizado.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(error => {
        console.log(error);
      })
  }

  cargarUsuarios(offset:number = 0)
  {
    let url = URL_SERVICIOS + '/usuario?offset=' + offset;
    return this.http.get(url);
  }

  buscarUsuarios(termino:string)
  {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuario/${termino}`;
    return this.http.get(url).pipe(
      map(
        (resp:any) => resp.usuario
      )
    );
  }

  borrarUsuario(id:string)
  {
    let url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map( resp => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      })
    );
  }
}
