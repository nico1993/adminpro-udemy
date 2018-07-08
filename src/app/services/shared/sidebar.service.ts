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
    }
  ];

  constructor() { }
}
