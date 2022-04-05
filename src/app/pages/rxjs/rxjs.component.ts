import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Observable,
  retry,
  interval,
  take,
  map,
  filter,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSubs: Subscription;
  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (valor) => console.log('subs: ', valor),
    //     (error) => console.warn('Eror:', error),
    //     () => console.info('Obs terminado')
    //   );
    this.intervalSubs = this.retornaIntervalo().subscribe((value) =>
      console.log(value)
    );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500).pipe(
      //take(10),
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => (valor % 2 === 0 ? true : false))
    );

    return intervalo$;
  }

  retornaObservable() {
    let i = -1;
    const obs$ = new Observable((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego a 2 ');
        }
      }, 1000);
    });

    return obs$;
  }
  ngOnInit(): void {}
}
