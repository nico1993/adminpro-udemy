import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: HttpClient, public _usuario: UsuarioService) { }

  findAll(offset: number)
  {
    let url = `${URL_SERVICIOS}/medico?offset=${offset}`;
    return this.http.get(url);
  }

  findOne(id: string)
  {
    let url = `${URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url)
      .pipe(
        map((resp:any) => resp.medico)
      );
  }

  search(query:string)
  {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/medico/${query}`;
    return this.http.get(url).pipe(
      map(
        (resp:any) => resp.medico
      )
    );
  }

  delete(id:string)
  {
    let url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuario.token}`;
    return this.http.delete(url).pipe(
      map(resp => {
        swal('Médico borrado', 'El médico ha sido eliminado correctamente', 'success');
        return true;
      })
    )
  }

  create(medico: Medico)
  {
    let url = `${URL_SERVICIOS}/medico?token=${this._usuario.token}`;
    return this.http.post(url, {nombre: medico.nombre, hospitalId: medico.hospital})
    .pipe(
      map((resp:any) => {
        swal("Médico creado", medico.nombre, "success");
        return resp.medico;
      })
    );
  }

  update(medico: Medico)
  {
    let url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuario.token}`;
    return this.http.put(url, {nombre: medico.nombre, hospitalId: medico.hospital})
    .pipe(
      map((resp:any) => {
        swal("Médico actualizado", medico.nombre, "success");
        return resp.medico;
      })
    );
  }
}
