import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
      );
  }

  crearMedico(medico: {nombre:string, hospital: string, email: string}) {
    const url = `${base_url}/medicos`;
    return this.http.post<any>(url, medico, this.headers);
  }

  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put<any>(url, medico, this.headers);
  }

  eliminarMedico(uid: string) {
    const url = `${base_url}/medicos/${uid}`;
    return this.http.delete<any>(url, this.headers);
  }

  getMedicoById(id: string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medico:any }) => resp.medico)
      );
  }

}
