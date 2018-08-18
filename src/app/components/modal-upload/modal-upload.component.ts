import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir:File;
  imagenTmp:string;

  constructor(public _subirArchivo: SubirArchivoService, public _modalUpload: ModalUploadService) {}

  ngOnInit() {
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

  cerrarModal()
  {
    this.imagenSubir = null;
    this.imagenTmp = null;
    this._modalUpload.ocultarModal();
  }

  subirImagen()
  {
    this._subirArchivo.subirArchivo(this.imagenSubir, this._modalUpload.tipo, this._modalUpload.id)
      .then(resp => {
        this._modalUpload.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(resp => {
        console.log("Error en la carga");
      });
  }
}
