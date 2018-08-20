import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medico: MedicoService,
    public _hospital: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUpload: ModalUploadService
  ) { 
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id !== 'nuevo')
      {
        this.findOne(id);
      }
    });
  }

  ngOnInit() {
    this._hospital.findAll().subscribe((response:any) => {
      this.hospitales = response.hospitales;
    });
    this._modalUpload.notificacion.subscribe((response:any) => {
      this.medico.img = response.medicoActualizado.img;
    });
  }

  guardarMedico(form:NgForm)
  {
    if(form.invalid)
      return;

      if(this.medico._id)
      {
        this._medico.update(this.medico).subscribe();
      }
      else
      {
        this._medico.create(this.medico).subscribe(medico => {
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        });
      }
  }

  cambioHospital(id:string)
  {
    this._hospital.findOne(id).subscribe((hospital:Hospital) => this.hospital = hospital)
  }

  findOne(id:string)
  {
    this._medico.findOne(id).subscribe(medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto()
  {
    this._modalUpload.mostrarModal('medicos', this.medico._id);
  }
}
