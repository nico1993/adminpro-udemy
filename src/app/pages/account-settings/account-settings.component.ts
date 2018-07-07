import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings: SettingsService) {}

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema:string, link:any)
  {
    this.aplicarCheck(link);
    this._settings.aplicarTema(tema);
  }

  aplicarCheck(link:any)
  {
    let selectores:any = document.getElementsByClassName('selector');
    for(let ref of selectores)
    {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck()
  {
    let selectores:any = document.getElementsByClassName('selector');
    let temaActual:string = this._settings.ajustes.tema;
    for(let ref of selectores)
    {
      if(temaActual == ref.getAttribute('data-theme'))
      {
        ref.classList.add('working');
        break;
      }
    }
  }
}
