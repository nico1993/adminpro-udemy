import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo:string;

  constructor(private router: Router, private title: Title, private meta: Meta) 
  {
    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
      title.setTitle(data.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };
      meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  getDataRoute()
  {
    return this.router.events
    .pipe(
      filter((evento, index) => {
        if(evento instanceof ActivationEnd)
        {
          return true;
        }
        return false;
      }),
      filter((evento:ActivationEnd, index) => {
        if(evento.snapshot.firstChild === null)
        {
          return true;
        }
        return false;
      }),
      map((evento:ActivationEnd) => {
        return evento.snapshot.data;
      })
    );
  }
}
