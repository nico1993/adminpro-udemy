import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuard, AdminGuard, SubirArchivoService, HospitalService, MedicoService, VerificaTokenGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    SubirArchivoService,
    ModalUploadService,
    UsuarioService,
    HospitalService,
    MedicoService,
    //Guards
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
