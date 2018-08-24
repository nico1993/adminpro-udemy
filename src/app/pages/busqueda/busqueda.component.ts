import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient, public _hospital: HospitalService) 
  {
    activatedRoute.params.subscribe(params => {
      let query = params['query'];
      this.buscar(query);
    });
   }

  ngOnInit() {
  }

  buscar(query:string)
  {
    let url = `${URL_SERVICIOS}/busqueda/todo/${query}`;
    this.http.get(url).subscribe((response:any) => {
      this.hospitales = response.hospitales;
      this.medicos = response.medicos;
      this.usuarios = response.usuarios;
    })
  }

  guardarHospital(hospital:Hospital)
  {
    this._hospital.update(hospital).subscribe();
  }
}
