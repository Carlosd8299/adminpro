import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }
  get token() {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }

  public buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/busquedas/coleccion/${tipo}/${termino}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => resp.resultado)
      );
  }
  busquedaglobal(termino: string) {
    const url = `${base_url}/busquedas/${termino}`;
    return this.http.get<any>(url, this.headers).pipe(
      map((resp: { medicos: any[], hospitales: any[], usuarios: any[] }) => resp)
    )
  }
}

