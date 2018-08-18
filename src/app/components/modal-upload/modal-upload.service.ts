import { Injectable, EventEmitter } from '@angular/core';

declare var $;

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo:string;
  public id:string;
  public oculto:boolean = true;

  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal()
  {
    $("#modal-upload").modal("hide");
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo:string, id: string)
  {
    this.tipo = tipo;
    this.id = id;
    $("#modal-upload").modal("show");
  }
}
