import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu:any = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'Progressbar', url: '/progress'},
        { titulo: 'Graficas', url: '/graficas'},
        { titulo: 'Promesas', url: '/promesas'},
        { titulo: 'Rxjs', url: '/rxjs'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitales'},
        {titulo: 'Medicos', url: '/medicos'}
      ]
    }
  ];

  constructor() { }
}
