import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient, public _usuario: UsuarioService) { }

  findAll(offset: number = 0)
  {
    let url = `${URL_SERVICIOS}/hospital?offset=${offset}`;
    return this.http.get(url);
  }

  findOne(id:string)
  {
    let url = `${URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.hospital)
      );
  }

  delete(id:string)
  {
    let url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuario.token}`;
    return this.http.delete(url).pipe(
      map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      })
    )
  }

  create(nombre:string)
  {
    let url = `${URL_SERVICIOS}/hospital?token=${this._usuario.token}`;
    return this.http.post(url, {nombre})
    .pipe(
      map(resp => {
        swal("Hospital creado", nombre, "success");
      })
    );
  }

  update(hospital: Hospital)
  {
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this._usuario.token}`;
    return this.http.put(url, hospital)
      .pipe(
        map((resp:any) => {
          swal("Hospital actualizado", hospital.nombre, 'success');
          console.log(resp);
          return true;
        })
      );
  }

  search(query:string)
  {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospital/${query}`;
    return this.http.get(url).pipe(
      map(
        (resp:any) => resp.hospital
      )
    );
  }
}
