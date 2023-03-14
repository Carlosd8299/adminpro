import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;
  constructor(private http: HttpClient) { }

  logOut() {
    localStorage.removeItem('token');
  }

  get token() {
    return localStorage.getItem('token') || '';
  }
  get uid() {
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean> {

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            email,  nombre, rol, google,  uid, password,img
          } = resp.usuario;
          this.usuario = new Usuario(nombre,email,'',google,rol,img,uid)
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError(error =>
          of(false)
        )
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
  // Se recomienda crear la nterfaz . Pero {} tambien se puede pedir datos
  actualizarPerfil(data: { email: string, nombre: string, rol: string }) {

    data = {...data, rol: this.usuario.rol!}
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      }
    }).pipe(
      tap((resp: any) => {

      })
    );
  }

  login(formData: Login) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token.toString());
      })
    );
  }
}
