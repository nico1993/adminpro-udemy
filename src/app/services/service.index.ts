//Main services
export { UsuarioService } from './usuario/usuario.service';
export { HospitalService } from './hospital/hospital.service';
export { MedicoService } from './medico/medico.service';

//Others services
export { SettingsService } from './settings/settings.service';
export { SharedService } from './shared/shared.service';
export { SidebarService } from './shared/sidebar.service';
export { SubirArchivoService } from './subir-archivo/subir-archivo.service';

//Guards
export { LoginGuard } from './guards/login.guard';
export { AdminGuard } from './guards/admin.guard';
export { VerificaTokenGuard } from 'src/app/services/guards/verifica-token.guard';