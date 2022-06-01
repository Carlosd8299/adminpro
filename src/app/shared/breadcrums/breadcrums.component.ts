import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [],
})
export class BreadcrumsComponent implements OnDestroy {
  public titulo: String = '';
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta();
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter((value: any) => value instanceof ActivationEnd),
        filter((value: ActivationEnd) =>
          value.snapshot.firstChild === null ? true : false
        ),
        map((value: ActivationEnd) => value.snapshot.data)
      )
      .subscribe(({ titulo }) => {
        this.titulo = titulo;
        document.title = `Admi Pro - ${this.titulo.toString()}`;
      });
  }
}
