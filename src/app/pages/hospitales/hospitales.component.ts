import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  offset: number = 0;
  total: number = 0;
  loading: boolean = false;

  constructor(public _hospital: HospitalService, public _modalUpload: ModalUploadService) 
  { }

  ngOnInit() {
    this.findAll();
    this._modalUpload.notificacion.subscribe( resp => {
      this.findAll();
    })
  }

  mostrarModal(id:string)
  {
    this._modalUpload.mostrarModal('hospitales', id);
  }

  findAll()
  {
    this.loading = true;
    this._hospital.findAll(this.offset).subscribe((response:any) => {
      this.loading = false;
      this.total = response.total;
      this.hospitales = response.hospitales;
    });  
  }

  buscar(query:string)
  {
    if(!query)
    {
      this.findAll();
      return;
    }
    
    this.loading = true;
    this._hospital.search(query).subscribe((hospitales:Hospital[]) => {
      this.loading = false;
      this.hospitales = hospitales;
      this.total = hospitales.length;
    });
  }

  borrarHospital(hospital: Hospital)
  {
    swal({
      title: "¿Esta seguro?",
      text: "Esta a punto de eliminar a "+ hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if(borrar)
      {
        this._hospital.delete(hospital._id).subscribe(borrado => {
          console.log(borrado);
          this.findAll();
        });
      }
    });
  }

  guardarHospital(hospital:Hospital)
  {
    this._hospital.update(hospital).subscribe();
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

  cargarHospital()
  {
    swal("Ingrese el nombre del hospital", {
      content: "input",
    })
    .then((nombre) => {
      if(nombre)
      {
        this._hospital.create(nombre).subscribe(resp => this.findAll());
      }
    });
  }
}
