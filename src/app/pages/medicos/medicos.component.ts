import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal:any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  offset:number = 0;
  total:number = 0;
  loading:boolean = true;

  constructor(public _medico: MedicoService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll()
  {
    this.loading = true;
    return this._medico.findAll(this.offset).subscribe((response:any) => {
      this.loading = false;
      this.total = response.total;
      this.medicos = response.medicos;
    });
  }

  cambiarOffset(valor:number)
  {
    let offset = this.offset + valor;
    if(offset >= this.total)
    {
      return;
    }
    if(offset < 0)
    {
      return;
    }
    this.offset = offset;
    this.findAll();
  }

  buscar(query:string)
  {
    if(!query)
    {
      this.findAll();
      return;
    }
    
    this.loading = true;
    this._medico.search(query).subscribe((medicos:Medico[]) => {
      this.loading = false;
      this.medicos = medicos;
      this.total = medicos.length;
    });
  }

  borrarMedico(medico: Medico)
  {
    swal({
      title: "¿Esta seguro?",
      text: "Esta a punto de eliminar a "+ medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if(borrar)
      {
        this._medico.delete(medico._id).subscribe(borrado => {
          this.findAll();
        });
      }
    });
  }
}
