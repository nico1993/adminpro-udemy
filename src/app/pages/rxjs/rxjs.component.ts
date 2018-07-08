import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription:Subscription;

  constructor() {
    
    this.subscription = this.regresaObs()
      //.pipe(retry(2))
      .subscribe(
        numero => { console.log("Subs", numero) },
        error => { console.error("Error en el obs", error) },
        () => { console.log("El obs terminó") }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy()
  {
    console.log("Cambio de pagina");
    this.subscription.unsubscribe();
  }

  regresaObs(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);
        // if (contador == 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        
        // if(contador == 2)
        // {
        //   clearInterval(intervalo);
        //   observer.error("No es 3!!");
        // }
      }, 1000);
    }).pipe(
      map(response => response.valor),
      filter((value, index) => {
        if((value % 2) === 1)
        {
          return true;
        }
        else
        {
          return false;
        }
      })
    );
  }
}
